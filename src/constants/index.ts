import sliderOne from "@/app/assets/images/sliderOne.png";
import sliderTwo from "@/app/assets/images/sliderTwo.png";
import sliderThree from "@/app/assets/images/sliderThree.png";
// import sliderFour from "@/app/assets/images/sliderFour.png";
import smartPhone from "../../public/icons/smartPhone.svg";
import pcCase from "../../public/icons/pcCase.svg";
import watch from "../../public/icons/watch.svg";
import scanFace from "../../public/icons/scanFace.svg";

export const navLinks = [
  { _id: 910, href: "/", title: "Home" },
  { _id: 911, href: "/phones", title: "Phones" },
  { _id: 912, href: "/phonecases", title: "Phone Cases" },
  { _id: 913, href: "/watches", title: "Watches" },
  { _id: 914, href: "/accessories", title: "Accessories" },
];

export const banner = [
  {
    imgSrc: sliderOne,
    paragraph1: "Get the Best products for you",
    paragraph2:
      " Browse the latest phones in the Market and get the one you dreamt for",
    heading: "Phones in Demand",
  },
  {
    imgSrc: sliderTwo,
    paragraph1: "Get the Best products for you",
    paragraph2:
      "   Browse the latest t-shirt in the Market and get the one you dreamt for",
    heading: "T-shirt in Demand",
  },
  {
    imgSrc: sliderThree,
    paragraph1: "Get the Best products for you",
    paragraph2:
      " Browse the latest phones in the Market and get the one you dreamt for",
    heading: "Phones in Demand",
  },
];

export const category = [
  {
    icon: smartPhone,
    title: "Phone",
    href: "/phones",
  },
  {
    icon: pcCase,
    title: "Phone Case",
    href: "/phonecases",
  },
  {
    icon: watch,
    title: "Watches",
    href: "/watches",
  },
  {
    icon: scanFace,
    title: "Accessories",
    href: "/accessories",
  },
];
