import { images } from "../../images";

const places = [
{
       title:'Chấm công',
    desc: "Cho phép các doanh nghiệp vừa và nhỏ có thể theo dõi giờ làm của nhân viên, tăng ca, vắng mặt, đi trễ, về sớm,...Ngoài ra hệ thống còn hỗ trợ tính năng xếp lịch làm việc theo từng cho nhân viên theo từng văn phòng (cửa hàng) làm việc theo Với chấm công online hệ thống sẽ phản ánh được thời gian chấm thực so với thời gian bắt đầu và kết thúc ca làm việc",
    imageUrl: process.env.PUBLIC_URL +images.bg2Home,
   // direction :'left',
    time:1500,
},
{
    title:'Thêm thẻ card',
 desc: "Cho phép các doanh nghiệp vừa và nhỏ có thể  thêm 1 thẻ card mới hoàn toàn cho nhân viên, hoặc có thể chỉnh sửa hay xóa thẻ card",
 imageUrl: '/assets/bg1.jpg',
//direction :'right',
 time:1500,
},


];
 export default places;