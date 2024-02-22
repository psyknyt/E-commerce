import React, { useState, useContext, memo } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { DataContext } from "../../DataContext";

const Pagination = memo(() => {
  const ctx = useContext(DataContext);
  // console.log(ctx);
  // const [active, setActive] = useState(1);
  // ctx.pagination(active);

  const getItemProps = (index) => ({
    variant: ctx.pageNumber === index ? "filled" : "text",
    color: "gray",
    onClick: () => ctx.setPage(index),
  });

  const next = () => {
    if (ctx.pageNumber === 5) {
      ctx.nextPage();
      return;
    }
    // setActive(active + 1);
    console.log("active: ", ctx.pageNumber);
    ctx.nextPage();
  };

  const prev = () => {
    if (ctx.pageNumber === 1) {
      ctx.nextPage();
      return;
    }

    ctx.prevPage();
  };

  return (
    <div className="flex justify-center items-center gap-4 m-10">
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={prev}
        disabled={ctx.pageNumber === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
      </div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={ctx.pageNumber === 5}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
});

export default Pagination;
