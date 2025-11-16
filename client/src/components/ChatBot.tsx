import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (userMessages: Message[]) => {
    setIsStreaming(true);
    
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: userMessages, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";
      let buffer = "";

      if (!reader) {
        throw new Error("No reader available");
      }

      setMessages(prev => [...prev, { role: "model", content: "" }]);

      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n\n");
        
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              
              if (data.chunk) {
                accumulatedText += data.chunk;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: "model",
                    content: accumulatedText,
                  };
                  return newMessages;
                });
              }
              
              if (data.done) {
                streamDone = true;
                break;
              }
              
              if (data.error) {
                throw new Error(data.error);
              }
            } catch (parseError) {
              console.error("Failed to parse SSE data:", line, parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1]?.role === "model" && !newMessages[newMessages.length - 1]?.content) {
          newMessages.pop();
        }
        return [...newMessages, { role: "model", content: t.chatbot.errorMessage }];
      });
    } finally {
      setIsStreaming(false);
    }
  };

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      setMessages([{ role: "model", content: t.chatbot.welcomeMessage }]);
    }
  }, [isOpen, messages.length, t.chatbot.welcomeMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSend = () => {
    if (!inputValue.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    const conversationHistory = [...messages.filter(m => m.role !== "model" || m !== messages[0]), userMessage];
    sendMessage(conversationHistory);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        size="icon"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg z-[100]"
        onClick={() => setIsOpen(true)}
        data-testid="button-chatbot-open"
        style={{ position: 'fixed' }}
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </Button>
    );
  }

  return (
    <div
      className={cn(
        "fixed z-[100] transition-all duration-200",
        "bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto",
        isMinimized ? "sm:w-80" : "sm:w-96"
      )}
      style={{ position: 'fixed' }}
    >
      <Card className={cn(
        "shadow-2xl transition-all duration-200",
        isMinimized ? "h-16" : "h-[28rem] sm:h-[32rem]"
      )}>
        <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-base" data-testid="text-chatbot-title">
                {t.chatbot.title}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {t.chatbot.subtitle}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsMinimized(!isMinimized)}
              data-testid="button-chatbot-minimize"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
              data-testid="button-chatbot-close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex flex-col h-[calc(28rem-5rem)] sm:h-[calc(32rem-5rem)]">
              <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex",
                        message.role === "user" ? "justify-end" : "justify-start"
                      )}
                      data-testid={`message-${message.role}-${index}`}
                    >
                      <div
                        className={cn(
                          "max-w-[85%] sm:max-w-[80%] rounded-lg px-3 py-2 sm:px-4",
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        )}
                      >
                        <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                  {isStreaming && messages[messages.length - 1]?.content === "" && (
                    <div className="flex justify-start" data-testid="message-typing">
                      <div className="bg-muted rounded-lg px-4 py-2">
                        <p className="text-sm text-muted-foreground italic">
                          {t.chatbot.typing}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="border-t p-3 sm:p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder={t.chatbot.placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isStreaming}
                    className="flex-1 text-sm sm:text-base"
                    data-testid="input-chatbot-message"
                  />
                  <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isStreaming}
                    data-testid="button-chatbot-send"
                    className="h-9 w-9 flex-shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
