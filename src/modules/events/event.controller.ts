import { Request, Response, NextFunction } from 'express';
import { event_service } from './event.service';
import sendResponse from '../../utils/sendResponse';

const create_event = async(req:Request, res:Response , next: NextFunction ) => {
    try{
        const result = await event_service.create_event_into_db({...req.body,organizer_id: req.user!.id,});
        sendResponse(res, {status_code: 201, success: true, message: "Event successfully", data: result} )

    }catch(error: any){
         next(error)
    }
}


const get_all_event = async(req: Request, res: Response, next: NextFunction) => {
    try{
        const search = req.query.search as string | undefined;

        const result = await event_service.get_single_event_from_db(search);
        sendResponse(res, {status_code: 200 , success: true, message: "Events retrieved successfully", data: result})
        
    }catch(error: any){
        next(error)
    }
}

 export const event_controller ={
    create_event,
    get_all_event
 }