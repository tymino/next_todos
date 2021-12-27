import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../../types/next';

export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === 'POST') {
    const { id, message } = req.body;

    res?.socket?.server?.io?.emit('message', message);

    // console.log(res?.socket?.server?.io?.to(id).emit('message', message));

    res?.socket?.server?.io?.to(id).emit('message', message);

    res.status(201).json(message);
  }
};
