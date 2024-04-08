export const info = {
  title: "AMAK Store",
  address: "AMAK Store, Đường Abc, Hà Nội",
  phone: "0123456789",
  email: "mail@example.com",
};

export const footer = [
  {
    title: "Hỗ trợ khách hàng",
    data: [
      {
        name: "Chính sách thanh toán",
        url: "/",
      },
      {
        name: "Chính sách vận chuyển",
        url: "/",
      },

      {
        name: "Chính sách bảo mật thông tin",
        url: "/",
      },

      {
        name: "Chính sách xử lý Khiếu nại",
        url: "/",
      },
      {
        name: "Chính sách đổi trả",
        url: "/",
      },
    ],
  },
  {
    title: "Liên kết",
    data: [
      {
        name: "Sản phẩm khuyến mãi",
        url: "/",
      },
      {
        name: "Sản phẩm nổi bật",
        url: "/",
      },
      {
        name: "Tất cả sản phẩm",
        url: "/",
      },
    ],
  },

  {
    title: "Blog",
    data: [
      {
        name: "Tin Tức",
        url: "/",
      },
      {
        name: "Thông báo bản quyền",
        url: "/",
      },
      {
        name: "Review",
        url: "/",
      },
    ],
  },
];

export const categories = [
  {
    name: "Light Novel",
    url: "/collections/light-novel",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_1_img.jpg?v=342",
  },

  {
    name: "Truyện Tranh",
    url: "/collections/manga-comic",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_2_img.jpg?v=342",
  },

  {
    name: "Tiểu thuyết",
    url: "/collections/tieu-thuyet",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_3_img.jpg?v=342",
  },

  {
    name: "Kỹ năng",
    url: "/collections/ky-nang",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/categorybanner_4_img.jpg?v=342",
  },
];

export const menubar = [
  {
    title: "Tất cả",
    href: "/collections/all",
  },
  {
    title: "Sách mới",
    href: "/collections/sach-moi",
  },
  {
    title: "Tiểu thuyết",
    href: "/collections/tieu-thuyet",
  },
  {
    title: "Kỹ năng",
    href: "/collections/ky-nang",
  },
  {
    title: "Light Novel",
    href: "/collections/light-novel",
  },
  {
    title: "Manga - Comic",
    href: "/collections/manga-comic",
  },
  {
    title: "Phụ kiện",
    href: "/collections/phu-kien",
  },
  {
    title: "Tra cứu đơn hàng",
    href: "/tra-cuu",
  },
];

export const selects = [
  {
    value: "LowToHigh",
    name: "Giá: Tăng dần",
  },
  {
    value: "HighToLow",
    name: "Giá: Giảm dần",
  },
  {
    value: "Alphabet",
    name: "Tên: A - Z",
  },
  {
    value: "ReverseAlphabet",
    name: "Tên: Z - A",
  },
  {
    value: "Lasted",
    name: "Mới nhất",
  },
  {
    value: "Oldest",
    name: "Cũ nhất",
  },
];

export const price = [
  {
    name: "Dưới 100.000₫",
    value: "Low",
  },
  { name: "100.000₫ - 200.000₫", value: "Medium" },
  { name: "200.000₫ - 300.000₫", value: "High" },
  { name: "300.000₫ - 400.000₫", value: "Highest" },
  {
    name: "Trên 400.000₫",
    value: "Max",
  },
];

export const statusList = {
  PENDING: "Chờ xác nhận",
  CREATE: "Khởi tạo thành công",
  SHIPPING: "Đơn hàng đang trên đường giao",
  SUCCESS: "Giao hàng thành công",
};

export const codPrice = 35000;

export const CheckboxType = ["send", "store"];
export const PaymentType = [
  {
    type: "cod",
    name: "Thanh toán khi giao hàng (COD)",
  },
  {
    type: "bank",
    name: "Chuyển khoản qua ngân hàng",
  },
  {
    type: "momo",
    name: "Ví MoMo",
  },
];

export const subBillboard = [
  {
    name: "Sale",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/banner_top_1_img_large.jpg?v=320",
    url: "/",
  },

  {
    name: "Product",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/banner_top_2_img_large.jpg?v=320",
    url: "/",
  },

  {
    name: "Gift",
    thumbnail:
      "https://theme.hstatic.net/200000294254/1001077164/14/banner_top_3_img_large.jpg?v=357",
    url: "/",
  },
];

export const statusRanking = {
  Bronze: "Đồng",
  Silver: "Bạc",
  Gold: "Vàng",
  Platinum: "Bạch kim",
  Diamond: "Kim cương",
};

export const statusRankingIcon = {
  Bronze: "/3.png",
  Silver: "/2.png",
  Gold: "/1.png",
  Platinum: "/4.png",
  Diamond: "/5.png",
};


export const statusReview = [
  {
    name: "Mới nhất",
    value: "Lasted",
  },
  {
    name: "Có hình ảnh",
    value: "Image",
  },
];

export const starReview = [
  {
    name: "5 sao",
    value: 5,
  },
  {
    name: "4 sao",
    value: 4,
  },
  {
    name: "3 sao",
    value: 3,
  },
  {
    name: "2 sao",
    value: 2,
  },
  {
    name: "1 sao",
    value: 1,
  },
];
