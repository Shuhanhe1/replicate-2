import { FC, HTMLAttributes, SyntheticEvent, useRef, useState } from "react";
import { MenuItem } from "../../../../common/types";
import { cx } from "class-variance-authority";
import { FaRegUser } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import {
  extractInputValue,
  getConductScienceUrl,
  redirect,
} from "../../../../common/utils";
import { useClickOutside } from "../../../../common/hooks";
import { MobileMenuItem } from "./MobileMenuItem/MobileMenuItem";
import { css } from "@emotion/css";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { Drawer, DrawerProps } from "@/components/ui/Drawer";
import { Flex } from "@/components/ui/Flex";
import { SearchField } from "@/components/ui/SearchField";

export interface MobileMenuProps
  extends HTMLAttributes<HTMLDivElement>,
    DrawerProps {
  menu: MenuItem[];
}

const icons = [
  { icon: <FaRegUser />, path: "my-account/" },
  { icon: <MdOutlineShoppingCart />, path: "cart/" },
  { icon: <FaRegRectangleList />, path: "request-quote/" },
];

const socialIcons = [
  { icon: <FaXTwitter />, path: "https://twitter.com/conductscience?lang=en" },
  {
    icon: <FaLinkedinIn />,
    path: "https://www.linkedin.com/company/conductscience/",
  },
  {
    icon: <FaInstagram />,
    path: "https://www.instagram.com/conductscience/?hl=en",
  },
];

export const MobileMenu: FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  className,
  menu,
  ...rest
}) => {
  const searchContainerRef = useRef<HTMLFormElement>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");

  useClickOutside(searchContainerRef, () => setIsSearchOpen(false));

  const handleIconClick = (path: string) => {
    redirect(getConductScienceUrl(path));
  };

  const handleSocialIconClick = (path: string) => {
    redirect(path, { newTab: true });
  };

  const handleSearchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    redirect(getConductScienceUrl(`/#f705/fullscreen/m=f&q=${search}`));
  };

  const renderContent = () => {
    if (isSearchOpen) {
      return (
        <form ref={searchContainerRef} onSubmit={handleSearchSubmit}>
          <SearchField
            iconPosition="right"
            outlined
            placeholder="Find anything for you science"
            value={search}
            onChange={(e) => setSearch(extractInputValue(e))}
          />
        </form>
      );
    }

    return (
      <div>
        {menu.map((item) => (
          <MobileMenuItem key={item.title} item={item} />
        ))}
        <Flex justify="center" gap="sm" className="mt-6">
          {socialIcons.map(({ icon, path }) => (
            <div
              key={path}
              onClick={() => handleSocialIconClick(path)}
              className="cursor-pointer text-neutral-400 hover:text-white"
            >
              {icon}
            </div>
          ))}
        </Flex>
      </div>
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      className={cx(className)}
      {...rest}
    >
      <Flex className="mt-4 text-2xl" gap="sm" justify="center">
        {icons.map(({ icon, path }, index) => (
          <div
            key={index}
            onClick={() => handleIconClick(path)}
            className="cursor-pointer text-neutral-400 hover:text-white"
          >
            {icon}
          </div>
        ))}
        <IoSearch
          className="cursor-pointer text-neutral-400 hover:text-white"
          onClick={() => !isSearchOpen && setIsSearchOpen(true)}
        />
      </Flex>
      <div
        className={cx(
          "text-md mt-6 overflow-y-auto font-light text-zinc-400",
          css`
            max-height: calc(100dvh - 150px);
          `
        )}
      >
        {renderContent()}
      </div>
    </Drawer>
  );
};
