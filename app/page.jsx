import ImageLoader from "@components/ImageLoader";
import Navbar from "@components/Navbar";
import ProductCatalog from "@components/ProductCatalog";
import SlideShow from "@components/SlideShow";
import Slogan from "@components/Slogan";

export default function Home() {
  return (
    <>
      <div className="flex  justify-center items-center">
        <div className="h-screen w-screen absolute z-40 bg-black/20"></div>
        <Navbar />
        <SlideShow />
        <Slogan />
      </div>
      <ProductCatalog />
    </>
  );
}
