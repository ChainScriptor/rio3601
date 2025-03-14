
import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { BlockchainIcon, CubeIcon } from "./pixel-art";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({ name: "", email: "", message: "" });
    // Show success message
    alert("Thanks for your message! I'll get back to you soon.");
  };

  return (
    <section
      id="contact"
      className="py-20 bg-pixel-grid bg-[length:16px_16px] relative overflow-hidden"
    >
      <div className="absolute -top-8 right-8 opacity-70">
        <CubeIcon />
      </div>
      <div className="absolute bottom-8 left-8 opacity-70">
        <BlockchainIcon />
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center mb-12 relative">
            <span className="relative z-10">Get In Touch</span>
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary"></span>
          </h2>
          
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/3">
              <div className="font-pixel text-sm mb-6">Contact Info</div>
              
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-1">
                    Email
                  </div>
                  <a 
                    href="mailto:contact@example.com" 
                    className="font-mono text-sm text-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    <span>contact@example.com</span>
                  </a>
                </div>
                
                <div>
                  <div className="font-mono text-xs text-muted-foreground mb-3">
                    Social Links
                  </div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="name" 
                    className="block font-pixel text-xs mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="pixel-input w-full"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="email" 
                    className="block font-pixel text-xs mb-2"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="pixel-input w-full"
                  />
                </div>
                
                <div>
                  <label 
                    htmlFor="message" 
                    className="block font-pixel text-xs mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="pixel-input w-full resize-none"
                  ></textarea>
                </div>
                
                <div className="pt-4">
                  <button type="submit" className="pixel-btn w-full md:w-auto font-pixel">
                    <span>Send Message</span>
                    <Send className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
