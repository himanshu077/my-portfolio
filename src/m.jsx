import jwt from "jsonwebtoken";

export const token = jwt.sign({ name: 'Himanshu' }, 'BSDFJSJRUWERJKCSJKDGFJ3223HASGFWEURYWEHFJFHSDF');
