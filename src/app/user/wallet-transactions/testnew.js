import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const palettes = [
  {
    name: "Trustworthy & Professional",
    primary: "#4CAF50",
    secondary: "#1E88E5",
    accent: "#FFD700",
    background: "#F5F5F5",
    text: "#333333",
  },
  {
    name: "Energetic & Engaging",
    primary: "#FF9800",
    secondary: "#388E3C",
    accent: "#1E88E5",
    background: "#FFFFFF",
    text: "#212121",
  },
  {
    name: "Premium & Elegant",
    primary: "#2E7D32",
    secondary: "#FFD700",
    accent: "#673AB7",
    background: "#F5F5F5",
    text: "#333333",
  },
];
const EducationWebsiteMockups = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {palettes.map((palette, index) => (
        <Card key={index} className="shadow-lg rounded-xl">
          <CardContent
            className="p-6 rounded-t-xl"
            style={{ backgroundColor: palette.primary }}
          >
            <h2 className="text-white text-xl font-bold">{palette.name}</h2>
          </CardContent>
          <CardContent
            className="p-6"
            style={{ backgroundColor: palette.background, color: palette.text }}
          >
            <p>
              This theme is best suited for {palette.name.toLowerCase()}{" "}
              educational websites.
            </p>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Button
                className="mt-4"
                style={{ backgroundColor: palette.accent, color: palette.text }}
              >
                Explore
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

module.exports = EducationWebsiteMockups;
