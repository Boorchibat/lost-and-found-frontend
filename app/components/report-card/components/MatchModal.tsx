"use client";

import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import Image from "next/image";
import { ItemProps } from "@/index";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 520,
  bgcolor: "background.paper",
  borderRadius: 6,
  boxShadow: 24,
  p: 3,
};

export const MatchModal = ({
  open,
  items,
  onClose,
  onContinue,
}: {
  open: boolean;
  items: ItemProps[];
  onClose: () => void;
  onContinue: () => void;
}) => {
  const router = useRouter();
  const [itemIndex, setItemIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  const item = items[itemIndex];
  const images = useMemo(
    () => [item.mainImage, ...(item.images || [])],
    [item],
  );

  const nextItem = () => {
    setItemIndex((prev) => (prev + 1) % items.length);
    setImageIndex(0);
  };

  const prevItem = () => {
    setItemIndex((prev) => (prev - 1 + items.length) % items.length);
    setImageIndex(0);
  };

  const nextImage = () => setImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);

  const handleClaim = () => {
    onClose();
    router.push(`/item/${item._id}`);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h5" fontWeight={800} textAlign="center" mb={2}>
          {items.length === 1 ? "Is this yours?" : "Are any of these yours?"}
        </Typography>

        <Box
          sx={{
            width: "100%",
            height: 240,
            position: "relative",
            borderRadius: 3,
            overflow: "hidden",
            mb: 2,
          }}
        >
          <Image
            src={images[imageIndex]?.url || "/file.svg"}
            alt={item.itemname}
            fill
            className="object-cover"
          />
          {images.length > 1 && (
            <>
              <IconButton
                onClick={prevImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: 10,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.85)",
                  "&:hover": { bgcolor: "white" },
                }}
              >
                <ChevronLeft />
              </IconButton>
              <IconButton
                onClick={nextImage}
                sx={{
                  position: "absolute",
                  top: "50%",
                  right: 10,
                  transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.85)",
                  "&:hover": { bgcolor: "white" },
                }}
              >
                <ChevronRight />
              </IconButton>
            </>
          )}
        </Box>

        <Typography fontWeight={700} textAlign="center" fontSize={18}>
          {item.itemname}
        </Typography>
        <Typography
          fontSize={14}
          color="text.secondary"
          textAlign="center"
          mb={1}
        >
          Found at {item.location}
        </Typography>
        <Typography
          fontSize={14}
          textAlign="center"
          sx={{
            color: "text.primary",
            bgcolor: "#f9fafb",
            borderRadius: 2,
            px: 2,
            py: 1.5,
            mb: 2,
          }}
        >
          {item.description}
        </Typography>

        {items.length > 1 && (
          <Typography
            fontSize={12}
            textAlign="center"
            color="text.secondary"
            mb={2}
          >
            Item {itemIndex + 1} / {items.length}
          </Typography>
        )}

        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          {items.length > 1 && (
            <>
              <Button variant="outlined" onClick={prevItem}>
                Previous Item
              </Button>
              <Button variant="outlined" onClick={nextItem}>
                Next Item
              </Button>
            </>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" gap={2}>
          <Button
            fullWidth
            sx={{
              backgroundColor: "#22c55e",
              "&:hover": { backgroundColor: "#16a34a" },
              color: "white",
              fontWeight: 700,
              py: 1.2,
            }}
            onClick={handleClaim}
          >
            Yes, this is mine
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#e5e7eb",
              color: "#374151",
              fontWeight: 600,
              py: 1.2,
              "&:hover": { bgcolor: "#f3f4f6", borderColor: "#d1d5db" },
            }}
            onClick={onContinue}
          >
            No, continue reporting
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
