import React from "react";

interface Promo {
  img: string;
  name: string;
  desc: string;
}

const Promotion = ({ img, name, desc }: Promo) => {
  return (
    <div className=" flex justify-center gap-20 sm:gap-32 md:justify-start md:gap-0 items-center bg-neutral-400 bg-opacity-5 p-3 rounded-lg">
      <img src={img} loading="lazy" alt="Hamburger promotion" className="h-32 md:h-20 pr-2 xl:pr-8 xl:h-32 " />
      <div>
        <h2 className="text-2xl lg:text-3xl text-white ">{name}</h2>
        <span className="text-violet text-2xl lg:text-3xl">{desc}</span>
      </div>
    </div>
  );
};

export default Promotion;
