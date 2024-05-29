export type tab = {
  tab_title: string;
  detail_element: {
    furniture_name: string;
    image: string;
    link: string;
    file: string;
  }[];
};

export const tabs = [
  {
    tab_title: "Chair",
    detail_element: [
      {
        furniture_name: "IKEA ODGER",
        image: "/furnitureTabImages/odger.png",
        link: "https://www.ikea.com/kr/ko/p/odger-chair-white-beige-40359997/",
        file: "chair_ikea_odger.glb",
      },
      {
        furniture_name: "IKEA MARTIN",
        image: "/furnitureTabImages/martin.png",
        link: "https://www.ikea.com/kr/ko/p/martin-chair-black-white-s49219530/#content",
        file: "chair_martin.glb",
      },
    ],
  },
  {
    tab_title: "Table",
    detail_element: [
      {
        furniture_name: "IKEA DOCSTA",
        image: "/furnitureTabImages/docsta.png",
        link: "https://www.ikea.com/kr/ko/p/docksta-table-white-white-s79324997/",
        file: "table_ikea_docsta.glb",
      },
      {
        furniture_name: "IKEA DALSHULT",
        image: "/furnitureTabImages/dalshult.png",
        link: "https://www.ikea.com/kr/ko/p/dalshult-table-white-birch-s29416857/",
        file: "table_dalshult.glb",
      },
    ],
  },
  {
    tab_title: "Shelf",
    detail_element: [
      {
        furniture_name: "MARKETB KOLONN",
        image: "/furnitureTabImages/kolonn.png",
        link: "https://marketb.kr/product/%EB%A7%88%EC%BC%93%EB%B9%84-kolonn-%EB%B2%BD%EC%84%A0%EB%B0%98-30x190-%EB%B8%8C%EB%9D%BC%EC%9A%B4-09848156-%EB%8B%B9%EC%9D%BC%EB%B0%9C%EC%86%A1/26734/",
        file: "shelf_kolonn.glb",
      },
      {
        furniture_name: "MARKETB LEITER",
        image: "/furnitureTabImages/leiter.png",
        link: "https://marketb.kr/product/%EC%98%A8%EB%A6%AC-%EB%A7%88%EC%BC%93%EB%B9%84-leiter-%EC%84%A0%EB%B0%98-600-%EB%84%93%EC%9D%80-4%EB%8B%A8-%EB%8B%B9%EC%9D%BC%EB%B0%9C%EC%86%A1/17941/",
        file: "shelf_leiter_600_4_blue.glb",
      },
    ],
  },
  {
    tab_title: "Desk",
    detail_element: [
      {
        furniture_name: "ROOMEDIT ADDON BASIC",
        image: "/furnitureTabImages/addon.png",
        link: "https://shop.allets.com/product/content.asp?guid=1035732",
        file: "desk_addon_basic.glb",
      },
      {
        furniture_name: "GAGUVALUE LEV",
        image: "/furnitureTabImages/lev.png",
        link: "https://gaguvalue.com/product/detail.html?product_no=678&cate_no=88&display_group=1&cafe_mkt=naver_ks&mkt_in=Y&ghost_mall_id=naver&ref=naver_open&NaPm=ct%3Dlbt630eg%7Cci%3Dd140c5a7a1133e2fc250b27e90acae94edbcdc97%7Ctr%3Dslsbrc%7Csn%3D4427660%7Chk%3D456e7ccabff493be8bbff82df267b5aaf14a857f",
        file: "desk_lev.glb",
      },
    ],
  },
  {
    tab_title: "Closet",
    detail_element: [
      {
        furniture_name: "LIVART TOFFE",
        image: "/furnitureTabImages/toffe.png",
        link: "https://www.hyundailivart.co.kr/p/P100032026",
        file: "closet_toffe.glb",
      },
      {
        furniture_name: "HANSSEM SAMBEDDING",
        image: "/furnitureTabImages/sambedding.png",
        link: "https://mall.hanssem.com/goods/goodsDetailMall.do?gdsno=39650&utm_source=naver&utm_medium=cps&NaPm=ct%3Dlbt757eg%7Cci%3D32d79b66e7cf1f1f979c88345c58c31d315cbc49%7Ctr%3Dslsbrc%7Csn%3D52395%7Chk%3D2279b80934093e2d2bcb7cf7dbeb7a5297f6bfd4",
        file: "closet_hanssem_sambedding.glb",
      },
    ],
  },
  {
    tab_title: "Drawer",
    detail_element: [
      {
        furniture_name: "VELIKA FLAT",
        image: "/furnitureTabImages/flat.png",
        link: "https://velikashop.com/product/%ED%94%8C%EB%9E%AB-%EB%84%93%EA%B3%A0-%EA%B9%8A%EC%9D%80-5%EB%8B%A8-%EC%84%9C%EB%9E%8D%EC%9E%A5-%EC%98%B7%EC%88%98%EB%82%A9%EC%9E%A5-%EC%A0%95%EB%A6%AC%ED%95%A8-%EB%8B%A4%EC%9A%A9%EB%8F%84%EC%84%9C%EB%9E%8D/1461/",
        file: "drawer_flat.glb",
      },
      {
        furniture_name: "INGHOME BASIC",
        image: "/furnitureTabImages/ingbasic.png",
        link: "https://inghome.co.kr/product/%EB%B2%A0%EC%9D%B4%EC%A7%81-h1225-5%EB%8B%A8-800-%EC%84%9C%EB%9E%8D%EC%9E%A5/4921/",
        file: "drawer_basic.glb",
      },
    ],
  },
  {
    tab_title: "Bed",
    detail_element: [
      {
        furniture_name: "ACE BRA1339",
        image: "/furnitureTabImages/bra1339.png",
        link: "https://www.acebed.com/product/bed/frame/view.do?detailsKey=94",
        file: "bed_ace_bra1339.glb",
      },
      {
        furniture_name: "ACE LUNATO",
        image: "/furnitureTabImages/lunato.png",
        link: "https://www.acebed.com/product/bed/frame/view.do?detailsKey=159",
        file: "bed_ace_lunato.glb",
      },
    ],
  },
];
