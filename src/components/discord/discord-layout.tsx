
import React, { useState } from "react";
import { 
  Hash, 
  Volume2, 
  Settings, 
  Users, 
  PlusCircle, 
  Search, 
  Smile, 
  Paperclip, 
  Gift, 
  Send, 
  Menu, 
  X 
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export const DiscordLayout = () => {
  const isMobile = useIsMobile();
  const [activeChannel, setActiveChannel] = useState("general");
  const [messages, setMessages] = useState({
    general: [
      { id: 1, user: "PixelKing", content: "Welcome to the server!", timestamp: "Today at 10:30 AM", avatar: "PK" },
      { id: 2, user: "WebCrafter", content: "This Discord clone looks amazing!", timestamp: "Today at 10:32 AM", avatar: "WC" },
      { id: 3, user: "DevArtist", content: "Let's chat about pixel art and web development", timestamp: "Today at 10:35 AM", avatar: "DA" },
      { id: 4, user: "TechGuru", content: "Anyone working on any cool projects?", timestamp: "Today at 10:40 AM", avatar: "TG" },
    ],
    announcements: [
      { id: 1, user: "Admin", content: "Welcome to our new Discord server!", timestamp: "Yesterday at 9:00 AM", avatar: "A" },
    ],
    resources: [
      { id: 1, user: "TechHelper", content: "Here are some useful resources for learning web development", timestamp: "Yesterday at 3:15 PM", avatar: "TH" },
      { id: 2, user: "TechHelper", content: "https://developer.mozilla.org/en-US/", timestamp: "Yesterday at 3:16 PM", avatar: "TH" },
    ]
  });
  const [newMessage, setNewMessage] = useState("");

  const servers = [
    { id: "main", icon: "🌐", name: "Main Server" },
    { id: "gaming", icon: "🎮", name: "Gaming" },
    { id: "dev", icon: "💻", name: "Development" },
  ];
  
  const channels = [
    { id: "general", name: "general", type: "text" },
    { id: "announcements", name: "announcements", type: "text" },
    { id: "resources", name: "resources", type: "text" },
    { id: "voice-chat", name: "voice chat", type: "voice" },
  ];

  const users = [
    { id: 1, name: "PixelKing", status: "online", role: "admin" },
    { id: 2, name: "WebCrafter", status: "online", role: "member" },
    { id: 3, name: "DevArtist", status: "idle", role: "member" },
    { id: 4, name: "TechGuru", status: "dnd", role: "member" },
    { id: 5, name: "CodeNinja", status: "offline", role: "member" },
  ];

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    setMessages({
      ...messages,
      [activeChannel]: [
        ...messages[activeChannel],
        {
          id: Date.now(),
          user: "You",
          content: newMessage,
          timestamp: "Just now",
          avatar: "Y"
        }
      ]
    });
    
    setNewMessage("");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "idle": return "bg-yellow-500";
      case "dnd": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#36393f] text-gray-100 pt-16">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile menu */}
        {isMobile && (
          <div className="flex items-center gap-2 px-4 absolute top-20 left-2 z-10">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-700">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 bg-[#2f3136]">
                <div className="flex h-full">
                  {/* Server sidebar */}
                  <div className="w-16 bg-[#202225] flex flex-col items-center py-4 gap-3">
                    {servers.map(server => (
                      <div 
                        key={server.id} 
                        className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl hover:rounded-xl transition-all cursor-pointer"
                        title={server.name}
                      >
                        {server.icon}
                      </div>
                    ))}
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:rounded-xl transition-all cursor-pointer text-green-500 hover:text-white">
                      <PlusCircle size={24} />
                    </div>
                  </div>
                  {/* Channel sidebar */}
                  <div className="w-60 bg-[#2f3136] overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-gray-800 font-medium">
                      Main Server
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="p-2">
                        <div className="text-gray-400 font-medium text-xs uppercase px-2 pt-4 pb-1">
                          Text Channels
                        </div>
                        {channels.filter(ch => ch.type === "text").map(channel => (
                          <div 
                            key={channel.id} 
                            className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 ${activeChannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                            onClick={() => setActiveChannel(channel.id)}
                          >
                            <Hash size={18} />
                            <span>{channel.name}</span>
                          </div>
                        ))}
                        <div className="text-gray-400 font-medium text-xs uppercase px-2 pt-4 pb-1">
                          Voice Channels
                        </div>
                        {channels.filter(ch => ch.type === "voice").map(channel => (
                          <div 
                            key={channel.id} 
                            className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 text-gray-400"
                          >
                            <Volume2 size={18} />
                            <span>{channel.name}</span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-gray-700">
                  <Users size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 bg-[#2f3136]">
                <div className="flex flex-col h-full">
                  <div className="p-4 text-gray-300 font-medium border-b border-gray-800">
                    Members — {users.length}
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="p-4">
                      <div className="text-gray-400 font-medium text-xs uppercase px-2 pb-2">
                        Online — {users.filter(u => u.status !== "offline").length}
                      </div>
                      {users.filter(u => u.status !== "offline").map(user => (
                        <div key={user.id} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700 cursor-pointer">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                              {user.name.substring(0, 2)}
                            </div>
                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] ${getStatusColor(user.status)}`}></div>
                          </div>
                          <div>
                            <div className={`font-medium ${user.role === 'admin' ? 'text-red-400' : 'text-gray-200'}`}>
                              {user.name}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="text-gray-400 font-medium text-xs uppercase px-2 py-2 mt-4">
                        Offline — {users.filter(u => u.status === "offline").length}
                      </div>
                      {users.filter(u => u.status === "offline").map(user => (
                        <div key={user.id} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-400">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center opacity-70">
                              {user.name.substring(0, 2)}
                            </div>
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] bg-gray-500"></div>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
        
        {/* Desktop layout */}
        {!isMobile && (
          <>
            {/* Server sidebar */}
            <div className="w-16 bg-[#202225] flex flex-col items-center py-4 gap-3">
              {servers.map(server => (
                <div 
                  key={server.id} 
                  className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xl hover:rounded-xl transition-all cursor-pointer"
                  title={server.name}
                >
                  {server.icon}
                </div>
              ))}
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center hover:bg-green-600 hover:rounded-xl transition-all cursor-pointer text-green-500 hover:text-white">
                <PlusCircle size={24} />
              </div>
            </div>

            {/* Channel sidebar */}
            <div className="w-60 bg-[#2f3136] overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-800 font-medium">
                Main Server
              </div>
              <ScrollArea className="flex-1">
                <div className="p-2">
                  <div className="text-gray-400 font-medium text-xs uppercase px-2 pt-4 pb-1">
                    Text Channels
                  </div>
                  {channels.filter(ch => ch.type === "text").map(channel => (
                    <div 
                      key={channel.id} 
                      className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 ${activeChannel === channel.id ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
                      onClick={() => setActiveChannel(channel.id)}
                    >
                      <Hash size={18} />
                      <span>{channel.name}</span>
                    </div>
                  ))}
                  <div className="text-gray-400 font-medium text-xs uppercase px-2 pt-4 pb-1">
                    Voice Channels
                  </div>
                  {channels.filter(ch => ch.type === "voice").map(channel => (
                    <div 
                      key={channel.id} 
                      className="flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer hover:bg-gray-700 text-gray-400"
                    >
                      <Volume2 size={18} />
                      <span>{channel.name}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-2 mt-auto bg-[#292b2f] flex items-center gap-2">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    Y
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#292b2f] bg-green-500"></div>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">You</div>
                  <div className="text-xs text-gray-400">#1234</div>
                </div>
                <button className="text-gray-400 hover:text-gray-200">
                  <Settings size={16} />
                </button>
              </div>
            </div>
          </>
        )}
        
        {/* Main content area */}
        <div className="flex-1 flex flex-col bg-[#36393f]">
          {/* Channel header */}
          <div className="h-12 border-b border-gray-800 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Hash size={24} className="text-gray-400" />
              <span className="font-medium">{channels.find(ch => ch.id === activeChannel)?.name}</span>
            </div>
            {!isMobile && (
              <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-gray-200">
                  <Search size={20} />
                </button>
                <button className="text-gray-400 hover:text-gray-200">
                  <Users size={20} />
                </button>
              </div>
            )}
          </div>
          
          {/* Messages area */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {messages[activeChannel]?.map((message) => (
                <div key={message.id} className="flex gap-3 group hover:bg-gray-700/30 -mx-2 px-2 py-1 rounded">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    {message.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{message.user}</span>
                      <span className="text-xs text-gray-400">{message.timestamp}</span>
                    </div>
                    <div className="text-gray-100">{message.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message input */}
          <div className="p-4">
            <form onSubmit={sendMessage} className="relative">
              <Input 
                className="bg-[#40444b] border-none text-gray-200 pr-20 h-12 focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder={`Message #${channels.find(ch => ch.id === activeChannel)?.name}`}
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2 text-gray-400">
                <button type="button" className="hover:text-gray-200">
                  <Paperclip size={20} />
                </button>
                <button type="button" className="hover:text-gray-200">
                  <Gift size={20} />
                </button>
                <button type="button" className="hover:text-gray-200">
                  <Smile size={20} />
                </button>
                <button 
                  type="submit" 
                  className={`hover:text-gray-200 ${!newMessage.trim() ? 'text-gray-600 cursor-not-allowed' : ''}`}
                  disabled={!newMessage.trim()}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Members sidebar - desktop only */}
        {!isMobile && (
          <div className="w-60 bg-[#2f3136] overflow-hidden">
            <div className="p-4 text-gray-300 font-medium border-b border-gray-800">
              Members — {users.length}
            </div>
            <ScrollArea className="h-full">
              <div className="p-4">
                <div className="text-gray-400 font-medium text-xs uppercase px-2 pb-2">
                  Online — {users.filter(u => u.status !== "offline").length}
                </div>
                {users.filter(u => u.status !== "offline").map(user => (
                  <div key={user.id} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700 cursor-pointer">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                        {user.name.substring(0, 2)}
                      </div>
                      <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] ${getStatusColor(user.status)}`}></div>
                    </div>
                    <div>
                      <div className={`font-medium ${user.role === 'admin' ? 'text-red-400' : 'text-gray-200'}`}>
                        {user.name}
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="text-gray-400 font-medium text-xs uppercase px-2 py-2 mt-4">
                  Offline — {users.filter(u => u.status === "offline").length}
                </div>
                {users.filter(u => u.status === "offline").map(user => (
                  <div key={user.id} className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700 cursor-pointer text-gray-400">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center opacity-70">
                        {user.name.substring(0, 2)}
                      </div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2f3136] bg-gray-500"></div>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
};
