import type React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";

interface PreviewProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
  name: string;
}

const Preview: React.FC<PreviewProps> = ({ src, isOpen, onClose, name }) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <img src={src || "/placeholder.svg"} alt={name} className="w-full h-auto" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Preview;
