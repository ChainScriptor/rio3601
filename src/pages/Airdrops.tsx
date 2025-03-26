
import { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Search, Upload, Link as LinkIcon, ExternalLink, Tag, Check, Star, Filter } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Toggle } from "@/components/ui/toggle";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Airdrop {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  logo?: string;
  rating?: number;
  status?: string;
  steps: {
    id: number;
    description: string;
  }[];
  created: string;
}

const CATEGORIES = ["All", "Layer 2", "DeFi", "NFT", "Gaming", "Social", "Cross-chain", "Infrastructure"];

const SAMPLE_AIRDROPS: Airdrop[] = [
  {
    id: "1",
    title: "Arbitrum Odyssey",
    description: "Complete tasks on Arbitrum to earn tokens and NFTs",
    link: "https://arbitrum.io/odyssey",
    category: "Layer 2",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    rating: 4.8,
    status: "Live",
    steps: [
      { id: 1, description: "Connect wallet to Arbitrum" },
      { id: 2, description: "Swap tokens on Arbitrum" },
      { id: 3, description: "Bridge assets from Ethereum" },
      { id: 4, description: "Participate in Arbitrum governance" }
    ],
    created: "2023-05-12"
  },
  {
    id: "2",
    title: "Optimism Quest",
    description: "Complete quests on Optimism for potential token rewards",
    link: "https://optimism.io/quests",
    category: "Layer 2",
    logo: "https://cryptologos.cc/logos/optimism-op-logo.png",
    rating: 4.5,
    status: "Live",
    steps: [
      { id: 1, description: "Connect wallet to Optimism" },
      { id: 2, description: "Use Optimism bridge" },
      { id: 3, description: "Interact with Optimism dapps" }
    ],
    created: "2023-06-20"
  },
  {
    id: "3",
    title: "LayerZero Passport",
    description: "Cross-chain passport program for early adopters",
    link: "https://layerzero.network",
    category: "Cross-chain",
    logo: "https://cryptologos.cc/logos/layerzero-zro-logo.png",
    rating: 4.7,
    status: "Live",
    steps: [
      { id: 1, description: "Connect wallet" },
      { id: 2, description: "Complete cross-chain transactions" },
      { id: 3, description: "Verify on social media" },
      { id: 4, description: "Join Discord community" }
    ],
    created: "2023-07-15"
  },
  {
    id: "4",
    title: "Zeta Chain Access",
    description: "Explore Zeta Chain's ecosystem for exclusive rewards",
    link: "https://zetachain.com",
    category: "Cross-chain",
    logo: "https://cryptologos.cc/logos/zetachain-zeta-logo.png",
    rating: 4.2,
    status: "Upcoming",
    steps: [
      { id: 1, description: "Join waitlist" },
      { id: 2, description: "Follow social media channels" },
      { id: 3, description: "Refer friends" }
    ],
    created: "2023-08-05"
  },
  {
    id: "5",
    title: "Uniswap V4 Early Access",
    description: "Get early access to Uniswap V4 features",
    link: "https://uniswap.org",
    category: "DeFi",
    logo: "https://cryptologos.cc/logos/uniswap-uni-logo.png",
    rating: 4.9,
    status: "Live",
    steps: [
      { id: 1, description: "Use Uniswap V3" },
      { id: 2, description: "Provide liquidity" },
      { id: 3, description: "Participate in governance" }
    ],
    created: "2023-09-10"
  },
  {
    id: "6",
    title: "Base Network Exploration",
    description: "Earn rewards for exploring Base Network dapps",
    link: "https://base.org",
    category: "Layer 2",
    logo: "https://cryptologos.cc/logos/base-logo.png",
    rating: 4.6,
    status: "Live",
    steps: [
      { id: 1, description: "Bridge to Base Network" },
      { id: 2, description: "Use Base Network dapps" },
      { id: 3, description: "Complete specific tasks" }
    ],
    created: "2023-10-01"
  }
];

const AirdropsPage = () => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>(SAMPLE_AIRDROPS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const form = useForm<Omit<Airdrop, 'id' | 'created'>>({
    defaultValues: {
      title: "",
      description: "",
      link: "",
      category: "",
      steps: [{ id: 1, description: "" }]
    }
  });

  const filteredAirdrops = airdrops.filter(airdrop => {
    const matchesSearch = airdrop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          airdrop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          airdrop.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || airdrop.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddAirdrop = (data: Omit<Airdrop, 'id' | 'created'>) => {
    const newAirdrop: Airdrop = {
      ...data,
      id: Date.now().toString(),
      created: new Date().toISOString().split('T')[0],
      rating: 5.0,
      status: "New"
    };

    setAirdrops([newAirdrop, ...airdrops]);
    form.reset();
    setIsAddDialogOpen(false);
    toast.success("Airdrop added successfully!");
  };

  const handleAddStep = () => {
    const currentSteps = form.getValues().steps || [];
    form.setValue('steps', [...currentSteps, { id: currentSteps.length + 1, description: "" }]);
  };

  const handleRemoveStep = (index: number) => {
    const currentSteps = form.getValues().steps || [];
    if (currentSteps.length > 1) {
      form.setValue('steps', currentSteps.filter((_, i) => i !== index));
    }
  };

  const handleOpenLink = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const getRatingColor = (rating: number = 0) => {
    if (rating >= 4.5) return "bg-gradient-to-r from-purple-500 to-pink-500";
    if (rating >= 4.0) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    if (rating >= 3.5) return "bg-gradient-to-r from-green-500 to-emerald-500";
    return "bg-gradient-to-r from-yellow-500 to-orange-500";
  };

  const getStatusBadge = (status: string = "Live") => {
    switch (status) {
      case "Live":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">{status}</Badge>;
      case "Upcoming":
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500">{status}</Badge>;
      case "Ended":
        return <Badge className="bg-gradient-to-r from-gray-500 to-slate-500">{status}</Badge>;
      case "New":
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#2E1E48] via-[#43388E] to-[#F5F7FA]">
        <Navbar />
        <main className="flex-grow pt-24 pb-12 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#9C5FFF]/20 blur-[100px]"></div>
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-[#38B5FF]/20 blur-[100px]"></div>
            <div className="absolute top-[30%] right-[10%] w-[25%] h-[25%] rounded-full bg-[#D946EF]/10 blur-[80px]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                Crypto Airdrop Tier List
              </h1>
              <p className="text-lg text-white/80 max-w-2xl mx-auto">
                Discover and participate in the latest blockchain airdrops to earn rewards and tokens
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-10 shadow-lg border border-white/20">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-auto flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300 h-4 w-4" />
                  <Input 
                    placeholder="Search airdrops..." 
                    className="pl-10 bg-white/20 border-white/20 text-white placeholder:text-purple-200/70 focus-visible:ring-purple-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                      <Upload className="mr-2 h-4 w-4" />
                      Add Airdrop
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Add New Airdrop</DialogTitle>
                      <DialogDescription>
                        Share details about a new airdrop with the community
                      </DialogDescription>
                    </DialogHeader>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(handleAddAirdrop)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Airdrop title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description of the airdrop" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Official Link</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., DeFi, NFT, Layer 2" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="space-y-3">
                          <Label>Steps to Participate</Label>
                          <FormDescription>
                            List the steps users need to follow to participate in this airdrop
                          </FormDescription>
                          
                          {form.watch('steps')?.map((step, index) => (
                            <div key={index} className="flex gap-3">
                              <Input
                                placeholder={`Step ${index + 1}`}
                                value={step.description}
                                onChange={(e) => {
                                  const newSteps = [...form.getValues().steps];
                                  newSteps[index].description = e.target.value;
                                  form.setValue('steps', newSteps);
                                }}
                              />
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => handleRemoveStep(index)}
                                disabled={form.watch('steps').length <= 1}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                          
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={handleAddStep} 
                            className="w-full"
                          >
                            Add Step
                          </Button>
                        </div>
                        
                        <DialogFooter>
                          <Button type="submit">Submit Airdrop</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="flex items-center mr-2">
                  <Filter className="h-4 w-4 mr-2 text-purple-300" />
                  <span className="text-white/80 text-sm">Filters:</span>
                </div>
                {CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none" 
                      : "bg-white/10 text-white/80 border border-white/20 hover:bg-white/20"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            
            {filteredAirdrops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAirdrops.map((airdrop) => (
                  <Card 
                    key={airdrop.id} 
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(123,97,255,0.3)] hover:border-purple-500/50 group"
                  >
                    <CardHeader className="p-6 pb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 flex items-center justify-center overflow-hidden">
                          {airdrop.logo ? (
                            <img src={airdrop.logo} alt={airdrop.title} className="w-8 h-8 object-contain" />
                          ) : (
                            <Tag className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-colors">
                              {airdrop.title}
                            </CardTitle>
                            {airdrop.rating && (
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium text-white ${getRatingColor(airdrop.rating)}`}>
                                    <Star className="h-3 w-3 mr-1 fill-white" />
                                    {airdrop.rating.toFixed(1)}
                                  </div>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-auto">
                                  <p className="text-sm">Community rating</p>
                                </HoverCardContent>
                              </HoverCard>
                            )}
                          </div>
                          <CardDescription className="text-white/70 mt-1">{airdrop.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="p-6 pt-2">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline" className="text-xs bg-white/10 text-white/80 border-white/20">
                          <Tag className="h-3 w-3 mr-1" />
                          {airdrop.category}
                        </Badge>
                        {airdrop.status && getStatusBadge(airdrop.status)}
                      </div>
                      
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="steps" className="border-white/20">
                          <AccordionTrigger className="text-white/90 hover:text-white py-2">
                            Steps to Participate
                          </AccordionTrigger>
                          <AccordionContent className="text-white/80">
                            <ul className="space-y-2">
                              {airdrop.steps.map((step) => (
                                <li key={step.id} className="flex items-start gap-2">
                                  <div className="h-5 w-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Check className="h-3 w-3 text-white" />
                                  </div>
                                  <span>{step.description}</span>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    
                    <CardFooter className="px-6 py-4 flex justify-between border-t border-white/10">
                      <div className="text-xs text-white/60">Added: {airdrop.created}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenLink(airdrop.link)}
                        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-white/20 text-white hover:bg-white/20"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
                <div className="text-3xl font-bold mb-4 text-white">No airdrops found</div>
                <p className="text-white/70 mb-6 max-w-md mx-auto">
                  No airdrops match your search criteria. Try with different keywords or add a new airdrop.
                </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Add Airdrop
                </Button>
              </div>
            )}
            
            {filteredAirdrops.length > 6 && (
              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious className="bg-white/10 text-white/80 hover:bg-white/20 hover:text-white" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" className="bg-white/10 text-white/80 hover:bg-white/20 hover:text-white">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext className="bg-white/10 text-white/80 hover:bg-white/20 hover:text-white" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AirdropsPage;
