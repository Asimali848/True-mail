import { useRef } from "react";

import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Comma from "../../assets/img/comma.svg";

// Dummy testimonial data
const testimonials = [
  {
    topParagraph:
      "Lorem ipsum dolor sit amet consectetur. Maecenas quis quisque eu id leo amet viverra quam parturient. Maecenas aenean tristique nunc sagittis in tristique ac tempus. In convallis justo curabitur.",
    heading: "Excellent Service",
    bottomParagraph: "CEO & Owner, Vision Trust",
  },
  {
    topParagraph:
      "Lorem ipsum dolor sit amet consectetur. Maecenas quis quisque eu id leo amet viverra quam parturient. Maecenas aenean tristique nunc sagittis in tristique ac tempus. In convallis justo curabitur.",
    heading: "Amazing Results",
    bottomParagraph: "CEO & Owner, Vision Trust",
  },
  {
    topParagraph:
      "Lorem ipsum dolor sit amet consectetur. Maecenas quis quisque eu id leo amet viverra quam parturient. Maecenas aenean tristique nunc sagittis in tristique ac tempus. In convallis justo curabitur.",
    heading: "Fast & Reliable",
    bottomParagraph: "CEO & Owner, Vision Trust",
  },
  {
    topParagraph:
      "Lorem ipsum dolor sit amet consectetur. Maecenas quis quisque eu id leo amet viverra quam parturient. Maecenas aenean tristique nunc sagittis in tristique ac tempus. In convallis justo curabitur.",
    heading: "Outstanding Support",
    bottomParagraph: "CEO & Owner, Vision Trust",
  },
  {
    topParagraph:
      "Lorem ipsum dolor sit amet consectetur. Maecenas quis quisque eu id leo amet viverra quam parturient. Maecenas aenean tristique nunc sagittis in tristique ac tempus. In convallis justo curabitur.",
    heading: "Cameron Williamson",
    bottomParagraph: "CEO & Owner, Vision Trust",
  },
];

const Testimonials = () => {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  return (
    <Carousel plugins={[plugin.current]} className="mx-auto w-full lg:w-3/4">
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-4">
              <Card>
                <CardContent className="flex flex-col items-center justify-center gap-2 border-none p-6 px-20 text-center">
                  <div className="w-full">
                    {" "}
                    <img src={Comma} alt="" />
                  </div>
                  <div className="lg:mx-20">
                    <p className="text-sm text-gray-500">
                      {testimonial.topParagraph}
                    </p>
                    <h2 className="mt-6 text-lg font-bold">
                      {testimonial.heading}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {testimonial.bottomParagraph}
                    </p>
                  </div>
                  <div className="flex w-full justify-end">
                    {" "}
                    <img src={Comma} alt="" className="rotate-180" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="hidden lg:flex" />
      <CarouselPrevious className="hidden lg:flex" />
    </Carousel>
  );
};

export default Testimonials;
