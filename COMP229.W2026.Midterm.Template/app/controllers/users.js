let UsersModel = require('../models/users');

module.exports.usersList = async function (req, res, next) {

     try {

        // Retrieve users from database
        let list = await UsersModel.find();

        // Convert _id to id and remove _id
        let formattedList = list.map(user => {
            let obj = user.toObject();
            obj.id = obj._id;
            delete obj._id;
            return obj;
        });
          return res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data: formattedList
        });

    } catch (error) {
        console.log(error);
        next(error);
    }

}

module.exports.getByID = async function (req, res, next) {
    try {
        let user = await UsersModel.findOne({ _id: req.params.id });
        if (!user)
            throw new Error('User not found. Are you sure it exists?') 
        
        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
        
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processAdd = async (req, res, next) => {
    try {
 
        let user = new UsersModel(req.body);
        let result = await user.save();

        let obj = result.toObject();
        obj.id = obj._id;
        delete obj._id;

        return res.json({
            success: true,
            message: "User added successfully.",
            data: obj
        });

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports.processEdit = async (req, res, next) => {
    try {

        let id = req.params.id;

        // Builds updatedUser from the values of the body of the request.
        let updatedUser = UsersModel(req.body);
        updatedUser._id = id;

        // Submits updatedUser to the DB and waits for a result.
        let result = await UsersModel.updateOne({ _id: id }, updatedUser);
        console.log("====> Result: ", result);

        // If the user is updated redirects to the list
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "User updated successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not udated. Are you sure it exists?')
        }

    } catch (error) {
        next(error)
    }
}


module.exports.performDelete = async (req, res, next) => {

    try {

        let id = req.params.id;

        let result = await UsersModel.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the book list
            res.json(
                {
                    success: true,
                    message: "User deleted successfully."
                }
            )
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not deleted. Are you sure it exists?')
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}
