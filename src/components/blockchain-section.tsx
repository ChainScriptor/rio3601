
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function BlockchainSection() {
  const blockchains = [
    {
      id: "bitcoin",
      name: "Bitcoin",
      description: "Το πρώτο και πιο διαδεδομένο blockchain.",
      features: [
        "Αποκεντρωμένο ψηφιακό νόμισμα",
        "Proof of Work συναίνεση",
        "Περιορισμένη προσφορά 21 εκατομμυρίων νομισμάτων",
        "Υψηλή ασφάλεια δικτύου"
      ],
      useCase: "Κυρίως χρησιμοποιείται ως ψηφιακός χρυσός και αποθήκη αξίας."
    },
    {
      id: "ethereum",
      name: "Ethereum",
      description: "Η πρώτη πλατφόρμα έξυπνων συμβολαίων.",
      features: [
        "Έξυπνα συμβόλαια",
        "Αποκεντρωμένες εφαρμογές (dApps)",
        "EVM (Ethereum Virtual Machine)",
        "Μετάβαση από Proof of Work σε Proof of Stake"
      ],
      useCase: "Υποστηρίζει DeFi, NFTs, DAOs και άλλες αποκεντρωμένες εφαρμογές."
    },
    {
      id: "solana",
      name: "Solana",
      description: "Blockchain με υψηλή ταχύτητα και χαμηλά τέλη συναλλαγών.",
      features: [
        "Proof of History + Proof of Stake",
        "Υψηλή απόδοση (~65.000 συναλλαγές/δευτερόλεπτο)",
        "Χαμηλά τέλη συναλλαγών",
        "Φιλικό προς τους προγραμματιστές"
      ],
      useCase: "Ιδανικό για εφαρμογές που απαιτούν υψηλή απόδοση όπως DeFi και παιχνίδια."
    },
    {
      id: "cardano",
      name: "Cardano",
      description: "Blockchain βασισμένο στην ακαδημαϊκή έρευνα.",
      features: [
        "Ouroboros Proof of Stake",
        "Επιστημονική προσέγγιση ανάπτυξης",
        "Πολυεπίπεδη αρχιτεκτονική",
        "Βιωσιμότητα και επεκτασιμότητα"
      ],
      useCase: "Εφαρμογές σε εκπαίδευση, γεωργία, υγειονομική περίθαλψη και ταυτότητα."
    },
    {
      id: "polkadot",
      name: "Polkadot",
      description: "Δίκτυο πολλαπλών αλυσίδων που επιτρέπει τη διαλειτουργικότητα.",
      features: [
        "Παραλληλοποιημένες αλυσίδες (Parachains)",
        "Διαλειτουργικότητα μεταξύ δικτύων",
        "Nominated Proof of Stake",
        "Κοινή ασφάλεια για όλες τις αλυσίδες"
      ],
      useCase: "Διασύνδεση διαφορετικών blockchain και δημιουργία εξειδικευμένων αλυσίδων."
    }
  ];

  return (
    <section id="blockchain" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Blockchain Layer 1</h2>
        <p className="mb-8 max-w-3xl">
          Τα Layer 1 blockchains είναι τα βασικά δίκτυα που παρέχουν την υποδομή για αποκεντρωμένες εφαρμογές. 
          Κάθε ένα έχει τα δικά του χαρακτηριστικά, πλεονεκτήματα και περιορισμούς.
        </p>

        <div className="mt-10">
          <Tabs defaultValue="blockchain-intro" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8 w-full">
              <TabsTrigger value="blockchain-intro" className="font-pixel text-xs">Εισαγωγή</TabsTrigger>
              {blockchains.map(blockchain => (
                <TabsTrigger key={blockchain.id} value={blockchain.id} className="font-pixel text-xs">
                  {blockchain.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="blockchain-intro" className="mt-4">
              <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="font-pixel text-xl">Τι είναι το Blockchain;</CardTitle>
                  <CardDescription>Βασική τεχνολογία πίσω από τα κρυπτονομίσματα και άλλες αποκεντρωμένες εφαρμογές</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    Το <strong>Blockchain</strong> είναι μια αποκεντρωμένη, κατανεμημένη και δημόσια βάση δεδομένων που καταγράφει 
                    συναλλαγές σε πολλούς υπολογιστές, έτσι ώστε κάθε εγγραφή να μην μπορεί να τροποποιηθεί αναδρομικά. 
                    Αυτή η τεχνολογία επιτρέπει ασφαλείς συναλλαγές χωρίς την ανάγκη κεντρικής αρχής.
                  </p>
                  
                  <div className="grid gap-4 mt-6">
                    <h3 className="text-lg font-semibold">Βασικά χαρακτηριστικά του Blockchain:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>Αποκέντρωση:</strong> Λειτουργεί χωρίς κεντρική αρχή</li>
                      <li><strong>Διαφάνεια:</strong> Όλες οι συναλλαγές είναι δημόσια καταγεγραμμένες</li>
                      <li><strong>Αμεταβλητότητα:</strong> Όταν καταγραφεί μια συναλλαγή, δεν μπορεί να αλλάξει</li>
                      <li><strong>Ασφάλεια:</strong> Χρησιμοποιεί κρυπτογραφία για την προστασία των δεδομένων</li>
                      <li><strong>Consensus:</strong> Απαιτεί συμφωνία του δικτύου για επικύρωση συναλλαγών</li>
                    </ul>
                  </div>
                  
                  <div className="grid gap-4 mt-6">
                    <h3 className="text-lg font-semibold">Τι είναι τα Layer 1 Blockchains;</h3>
                    <p>
                      Τα <strong>Layer 1 Blockchains</strong> είναι τα βασικά δίκτυα blockchain που λειτουργούν στο δικό τους ανεξάρτητο 
                      δίκτυο. Αυτά τα δίκτυα έχουν τους δικούς τους κανόνες συναίνεσης, τοκενομικά και χαρακτηριστικά. 
                      Παραδείγματα περιλαμβάνουν το Bitcoin, το Ethereum, το Cardano, το Solana και το Polkadot.
                    </p>
                    <p>
                      Κάθε Layer 1 προσπαθεί να επιλύσει το "τρίλημμα του blockchain", δηλαδή τον συμβιβασμό ανάμεσα στην 
                      αποκέντρωση, την ασφάλεια και την επεκτασιμότητα, με διαφορετικές προσεγγίσεις και τεχνολογίες.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {blockchains.map(blockchain => (
              <TabsContent key={blockchain.id} value={blockchain.id} className="mt-4">
                <Card className="border-2 border-primary/20 bg-card/50 backdrop-blur">
                  <CardHeader>
                    <CardTitle className="font-pixel text-xl">{blockchain.name}</CardTitle>
                    <CardDescription>{blockchain.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 mt-2">
                      <h3 className="text-lg font-semibold">Βασικά χαρακτηριστικά:</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        {blockchain.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid gap-4 mt-4">
                      <h3 className="text-lg font-semibold">Περιπτώσεις χρήσης:</h3>
                      <p>{blockchain.useCase}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
