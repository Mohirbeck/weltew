import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  images,
  name,
  category,
  id,
  horizontal = false,
  to = `/products/${id}`,
  availibility = false,
}) {
  function Images() {
    let img = images[0]?.image || "/images/placeholder.webp";
    const changeImage = (e) => {
      img = e.target.dataset.image;
    };
    return (
      <div
        className={
          horizontal
            ? "h-full relative group/images w-[480px]"
            : "h-[220px] relative group/images"
        }
      >
        <div
          className="grid w-full h-full absolute top-0 left-0 z-10"
          style={{
            gridTemplateColumns: `repeat(${images.length}, minmax(0, 1fr))`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="h-full group/preview"
              data-image={image.image}
              onMouseEnter={changeImage}
              onMouseOver={changeImage}
            ></div>
          ))}
        </div>
        <Image
          src={img}
          alt={name || "Product"}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          style={{
            objectFit: to.includes("products") ? "contain" : "cover",
          }}
        />
      </div>
    );
  }
  return (
    <div
      className={
        horizontal
          ? "bg-white border border-grey flex col-span-2 py-5 px-8 relative"
          : "bg-white border border-grey col-span-1 relative"
      }
    >
      {availibility && (
        <div
          className={
            horizontal
              ? "absolute z-10 top-2 right-2 bg-[#d02d8b] text-white text-sm uppercase font-medium px-4 py-1 rounded-full"
              : "absolute z-10 top-2 right-2 bg-[#d02d8b] text-white text-xs uppercase font-semibold px-4 py-1 rounded-full"
          }
        >
          В наличии
        </div>
      )}

      <Link href={to}>
        <Images />
      </Link>
      <div
        className={
          horizontal
            ? "flex-grow flex flex-col relative h-full justify-center"
            : "p-6 flex-grow"
        }
      >
        <Link
          href={to}
          className={
            horizontal
              ? "block text-primary font-medium text-right text-[25px]"
              : "block text-primary font-medium text-lg"
          }
        >
          {name}
        </Link>
        <Link
          href={to}
          className={
            horizontal
              ? "block text-primary font-medium text-right text-base"
              : "block text-primary font-medium text-sm"
          }
        >
          {typeof category === "string" ? category : category.name}
        </Link>
        <div
          className={horizontal ? "absolute w-full left-3 bottom-0" : "mt-12"}
        >
          <Link
            href={to}
            className="py-2 bg-transparent border border-grey hover:bg-grey w-full transition text-primary rounded-full flex space-x-2 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 stroke-secondary stroke-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
              />
            </svg>
            <span>Информация о продукте</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
