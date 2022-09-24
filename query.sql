use casestudy3;


create table Products(
	ProductsID int not null unique auto_increment,
    productsName varchar(50) not null,
    oldPrice float,
    currentPrice float,
    img varchar(100) not null,
    descriptionProduct varchar(10000000),
    CONSTRAINT PK_PRODUCTS PRIMARY KEY(ProductsID)
);

drop table Products;

create table Cart(
	ProductsID int,
    userID int,
	SLban int,
    CONSTRAINT FK_CART_PRODUCTS FOREIGN KEY(ProductsID) REFERENCES Products(ProductsID),
	CONSTRAINT FK_CART_USERS FOREIGN KEY(userID) REFERENCES Users(userID)
);

drop table Cart;

insert Products(productsName ,oldPrice ,currentPrice ,img ,descriptionProduct ) values
('Fittonia',24.45,20.34,'Fittonia.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!'),
('Gerbera',24.01,20.01,'Gerbera.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!'),
('Chinese Evergreen',30.45,30.34,'ChineseEvergreen.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Daisy',44.45,40.34,'daisy.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Doris Taylor',54.45,50.34,'DorisTaylor.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Echeveria Orion',64.45,60.34,'EcheveriaOrion.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Elegans',74.45,70.34,'Elegans.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Ficus Lyata',84.45,80.34,'FicusLyata2.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Arum Fern',94.45,90.34,'ArumFern.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Fittonia Red',104.45,100.34,'Fittoniared.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Camellia',124.45,120.34,'Camellia.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!')
,('Goldcrest Tree',134.45,130.34,'GoldcrestTree.jpg','When turned into a herb, Shasta Daisy is often used to help with aches and pains, also with liver disorders, and can also help with fevers. Shasta daisies bloom over an extended period, from early summer until fall, forming tidy clumps. The bright flowers contrast nicely with the dark green foliage and will liven up any garden bed. Also suitable for cutting!');

create table Users(
	userID int not null unique auto_increment,
    accountUser varchar(20) not null,
    emailUser varchar(50) not null,
    passwordUser varchar(50) not null,
    CONSTRAINT PK_USERS PRIMARY KEY(userID)
);

drop table Users;

insert Users(accountUser,emailUser,passwordUser) value
('Duc','mintduc@gmail.com','Duc123'),
('Linh','linh@gmail.com','Linh123'),
('Ngoc','minhngoc@gmail.com','Ngoc123'),
('Sy','sy@gmail.com','Sy123');

insert Cart(ProductsId,userId,SLban) value
(1,2,10),(2,2,5);


drop table cart;

create table Bill(
	BillID int not null unique auto_increment,
    userID int not null,
    TongTien int,
    CONSTRAINT PK_Bill PRIMARY KEY(BillID),
    CONSTRAINT FK_Bill_USERS FOREIGN KEY(userID) REFERENCES Users(userID)
)

select * from Products;
select * from Users;
select * from Cart;
select * from Bill;

insert Bill value (1,2,100);
delete from Bill where BillID = 3;


delete from Cart where userID = 2 and ProductsID = 8;
select * from cart where ProductsId = 2 and userId = 2;
UPDATE Cart
SET SLBan = SLBan + 1
WHERE ProductsID = 2 and userID = 2;


select Products.ProductsID,img,productsName,currentPrice,slBan from Products
 inner join Cart on Products.ProductsID = Cart.ProductsID where Cart.userID = 2;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345678';
FLUSH PRIVILEGES;

