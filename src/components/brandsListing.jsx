import InfiniteLooper from "./infiniteScroller";
import { logos } from "../utils/logos";

export default function Brands() {
  return (
    <div className="py-16 flex gap-y-12 md:gap-y-6 flex-col items-center">
      <p className="text-xl">
        Our users have landed <span className="text-secondary-600">jobs</span>{" "}
        at: <span className="font-extrabold">*</span>
      </p>

      <InfiniteLooper speed="30" direction="left">
        {logos.map((logo, index) => (
          <div key={index} className="mx-6">
            <img
              className="aspect-auto h-[70px]"
              src={logo.src}
              alt={logo.name}
            />
          </div>
        ))}
      </InfiniteLooper>
    </div>
  );
}