
import { useState } from "react";
import { Mail, Send, Loader2 } from "lucide-react";
import { sendContactEmail } from "@/lib/email";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error("Please complete all required fields");
      }
      
      // Send email
      const success = await sendContactEmail(formData);
      
      if (success) {
        toast({
          title: "Message sent successfully!",
          description: "I'll get back to you as soon as possible.",
          variant: "default",
        });
        
        // Reset form
        setFormData({
          name: "",
          company: "",
          email: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-cyber-navy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-space">
            <span className="text-cyber-teal">Get in</span> Touch
          </h2>
          <div className="w-20 h-1 bg-cyber-teal mx-auto mt-4 mb-6"></div>
          <p className="text-cyber-slate max-w-2xl mx-auto">
            Interested in working together? Feel free to reach out for collaborations or just a friendly hello.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-cyber-blue rounded-lg p-8 md:p-10 border border-cyber-teal/20">
          <div className="flex items-center justify-center mb-8">
            <div className="p-3 rounded-full bg-cyber-teal/10 mr-4">
              <Mail className="text-cyber-teal" size={24} />
            </div>
            <h3 className="text-xl font-bold text-cyber-lightest">Send me a message</h3>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-cyber-lightest">
                  Your Name <span className="text-cyber-teal">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-cyber-navy border-cyber-teal/20 focus:border-cyber-teal focus:ring-cyber-teal/20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium text-cyber-lightest">
                  Company
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your Company Ltd."
                  className="bg-cyber-navy border-cyber-teal/20 focus:border-cyber-teal focus:ring-cyber-teal/20"
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <label htmlFor="email" className="text-sm font-medium text-cyber-lightest">
                Email Address <span className="text-cyber-teal">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="bg-cyber-navy border-cyber-teal/20 focus:border-cyber-teal focus:ring-cyber-teal/20"
                required
              />
            </div>
            
            <div className="space-y-2 mb-8">
              <label htmlFor="message" className="text-sm font-medium text-cyber-lightest">
                Message <span className="text-cyber-teal">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or inquiry..."
                className="bg-cyber-navy border-cyber-teal/20 focus:border-cyber-teal focus:ring-cyber-teal/20 min-h-[150px]"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-cyber-teal text-cyber-blue hover:bg-cyber-teal/90 px-8 py-6 w-full md:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} className="mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
        
        <div className="text-center mt-12 text-cyber-slate">
          <p>
            You can also reach me directly at{" "}
            <a href="mailto:contact@example.com" className="text-cyber-teal hover:underline">
              contact@example.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
