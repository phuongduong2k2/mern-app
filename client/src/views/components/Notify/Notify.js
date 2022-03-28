// import {notification} from "antd";
import toastr from 'toastr'


// ANT DESIGN
// class Notify {

//     push(message, description) {

//     }

//     success(message, description) {
//         notification.success({
//             message,
//             description
//         });
//     }

//     error(message, description) {
//         notification.error({
//             message,
//             description
//         });
//     }

//     warn(message, description) {
//         notification.warn({
//             message,
//             description
//         });
//     }

//     info(message, description) {
//         notification.info({
//             message,
//             description
//         });
//     }
// }


// TOASTR
class Notify {

    success(description, message, option) {
        toastr.success( 
            description,
            message, 
            option
        )
    }

    error(description, message, option) {
        toastr.error(
            description,
            message,
            option
        );
    }

    warn(description, message, option) {
        toastr.wanr(
            description,
            message,
            option
        );
    }

    info(description, message, option) {
        toastr.info(
            description,
            message,
            option
        );
    }

}

export default new Notify();
