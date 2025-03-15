
import { useState } from "react";
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
import { Search, Upload, Link as LinkIcon, ExternalLink, Tag, Check } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Airdrop {
  id: string;
  title: string;
  description: string;
  link: string;
  category: string;
  steps: {
    id: number;
    description: string;
  }[];
  created: string;
}

const SAMPLE_AIRDROPS: Airdrop[] = [
  {
    id: "1",
    title: "Arbitrum Odyssey",
    description: "Complete tasks on Arbitrum to earn tokens and NFTs",
    link: "https://arbitrum.io/odyssey",
    category: "Layer 2",
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
    steps: [
      { id: 1, description: "Connect wallet" },
      { id: 2, description: "Complete cross-chain transactions" },
      { id: 3, description: "Verify on social media" },
      { id: 4, description: "Join Discord community" }
    ],
    created: "2023-07-15"
  }
];

const AirdropsPage = () => {
  const [airdrops, setAirdrops] = useState<Airdrop[]>(SAMPLE_AIRDROPS);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredAirdrops = airdrops.filter(airdrop => 
    airdrop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airdrop.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    airdrop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAirdrop = (data: Omit<Airdrop, 'id' | 'created'>) => {
    const newAirdrop: Airdrop = {
      ...data,
      id: Date.now().toString(),
      created: new Date().toISOString().split('T')[0]
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

  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-pixel mb-2">Live Airdrops</h1>
                <p className="text-muted-foreground">
                  Discover and track the latest blockchain airdrops
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input 
                    placeholder="Search airdrops..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
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
            </div>
            
            {filteredAirdrops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAirdrops.map((airdrop) => (
                  <Card key={airdrop.id} className="border-2 shadow-pixel">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-pixel">{airdrop.title}</CardTitle>
                          <CardDescription className="mt-1">{airdrop.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {airdrop.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="steps">
                          <AccordionTrigger className="font-medium">
                            Steps to Participate
                          </AccordionTrigger>
                          <AccordionContent>
                            <Table>
                              <TableBody>
                                {airdrop.steps.map((step) => (
                                  <TableRow key={step.id}>
                                    <TableCell className="w-10 text-center font-medium">{step.id}</TableCell>
                                    <TableCell>{step.description}</TableCell>
                                    <TableCell className="w-10">
                                      <div className="h-6 w-6 rounded-full border flex items-center justify-center">
                                        <Check className="h-3 w-3" />
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <div className="text-xs text-muted-foreground">Added: {airdrop.created}</div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenLink(airdrop.link)}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-3xl font-pixel mb-4">No airdrops found</div>
                <p className="text-muted-foreground mb-6">
                  No airdrops match your search criteria. Try with different keywords or add a new airdrop.
                </p>
                <Button
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Add Airdrop
                </Button>
              </div>
            )}
            
            {filteredAirdrops.length > 0 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
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
