import {Schema,model,models} from "mongoose";

const OrganiserSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});

const Organiser = models.Organiser || model("Organiser", OrganiserSchema);

export default Organiser;