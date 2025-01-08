"user server"

import Organiser from "../modals/organiser.modal"
import {connect} from "../db"

export async function createOrganiser(organiser: any) {
    try {
        await connect();
        const newOrganiser = await Organiser.create(organiser);
        return JSON.parse(JSON.stringify(newOrganiser));

    } catch (error) {
        console.error("Error while creating new organiser", error);
    }
}