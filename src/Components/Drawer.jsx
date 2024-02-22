import React, { useState, useContext, useEffect } from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  Checkbox,
  ListItemPrefix,
} from "@material-tailwind/react";

import { DataContext } from "../../DataContext";

export default function DrawerCategories({ text }) {
  // const [open, setOpen] = useState(false);

  const ctx = useContext(DataContext);

  const open = ctx.categoryVisib;

  const closeDrawer = () => ctx.setCategories(false);

  return (
    <div className="flex items-center">
      {/* <button onClick={openDrawer}>{text}</button> */}
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="overflow-auto scrollbar-hide scroll-smooth snap-x"
      >
        <div className="flex items-center justify-between p-2">
          <Typography variant="h5" color="blue-gray">
            Product Categories
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <List>
          {ctx.categories.map((el, index) => (
            <ListItem className="flex justify-between" key={index}>
              {el}
              <ListItemPrefix>
                <Checkbox color="blue" />
              </ListItemPrefix>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
