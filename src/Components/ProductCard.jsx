import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function ProductCard({ props }) {
  console.log(props);
  return (
    <Card className="">
      <CardHeader shadow={false} floated={false} className="h-96">
        <img
          src={props.images[0]}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <div className="mb-2 flex items-center justify-between">
          <Typography color="blue-gray" className="font-medium">
            {props.brand}
          </Typography>
          <Typography color="blue-gray" className="font-medium">
            ₹{props.price * 84}.00
          </Typography>
        </div>
        <Typography
          variant="small"
          color="gray"
          className="font-normal opacity-75"
        >
          {props.description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 flex">
        {/* <Typography color="blue-gray" className="font-medium">
          {props.rating}
        </Typography> */}
        <Button
          ripple={false}
          fullWidth={true}
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
