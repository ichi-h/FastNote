// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiResponse } from "next";

export default (res: NextApiResponse): void => {
  res.status(200).json({ name: "John Doe" });
};
