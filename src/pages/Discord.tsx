
import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { DiscordLayout } from "@/components/discord/discord-layout";

const Discord = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <DiscordLayout />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Discord;
