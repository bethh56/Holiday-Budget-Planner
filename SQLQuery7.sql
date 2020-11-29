USE [master]
GO
/****** Object:  Database [HolidayBudgetPlanner]    Script Date: 11/29/2020 3:04:47 PM ******/
CREATE DATABASE [HolidayBudgetPlanner]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HolidayBudgetPlanner', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\HolidayBudgetPlanner.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HolidayBudgetPlanner_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\HolidayBudgetPlanner_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [HolidayBudgetPlanner] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [HolidayBudgetPlanner].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [HolidayBudgetPlanner] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET ARITHABORT OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET  DISABLE_BROKER 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET RECOVERY FULL 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET  MULTI_USER 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [HolidayBudgetPlanner] SET DB_CHAINING OFF 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [HolidayBudgetPlanner] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'HolidayBudgetPlanner', N'ON'
GO
ALTER DATABASE [HolidayBudgetPlanner] SET QUERY_STORE = OFF
GO
USE [HolidayBudgetPlanner]
GO
/****** Object:  Table [dbo].[Budget]    Script Date: 11/29/2020 3:04:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Budget](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[holidayId] [int] NOT NULL,
	[budgetAmount] [decimal](5, 2) NOT NULL,
	[dateCreated] [datetime] NOT NULL,
	[isActive] [bit] NOT NULL,
	[currentPlan] [bit] NOT NULL,
	[userId] [int] NOT NULL,
 CONSTRAINT [PK__Budget__3213E83F617E4903] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gift]    Script Date: 11/29/2020 3:04:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gift](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[recepient] [nvarchar](100) NULL,
	[item] [nvarchar](200) NULL,
	[price] [decimal](5, 2) NOT NULL,
	[isActive] [bit] NOT NULL,
	[budgetId] [int] NOT NULL,
 CONSTRAINT [PK__Gift__3213E83FB2557D92] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Holiday]    Script Date: 11/29/2020 3:04:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Holiday](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[holidayName] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK__Holiday__3213E83FFCCAE44A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ItemCategory]    Script Date: 11/29/2020 3:04:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ItemCategory](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[categoryName] [nvarchar](200) NOT NULL,
	[itemName] [nvarchar](200) NULL,
	[price] [decimal](5, 2) NOT NULL,
	[isActive] [bit] NOT NULL,
	[budgetId] [int] NOT NULL,
 CONSTRAINT [PK__ItemCate__3213E83F810D22C5] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11/29/2020 3:04:47 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [nchar](20) NOT NULL,
	[lastName] [nchar](20) NOT NULL,
	[email] [nchar](50) NOT NULL,
	[password] [nchar](25) NOT NULL,
	[isActive] [bit] NOT NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Budget] ON 
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (1, 1, CAST(125.00 AS Decimal(5, 2)), CAST(N'2020-11-15T00:00:00.000' AS DateTime), 1, 1, 1)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (2, 1, CAST(225.00 AS Decimal(5, 2)), CAST(N'2019-10-01T00:00:00.000' AS DateTime), 1, 0, 1)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (3, 1, CAST(75.00 AS Decimal(5, 2)), CAST(N'2018-12-01T00:00:00.000' AS DateTime), 1, 0, 1)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (4, 2, CAST(125.00 AS Decimal(5, 2)), CAST(N'2020-11-01T00:00:00.000' AS DateTime), 1, 1, 2)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (5, 3, CAST(115.00 AS Decimal(5, 2)), CAST(N'2020-04-01T00:00:00.000' AS DateTime), 1, 0, 2)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (6, 6, CAST(275.00 AS Decimal(5, 2)), CAST(N'2018-12-15T00:00:00.000' AS DateTime), 0, 0, 2)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (7, 1, CAST(125.00 AS Decimal(5, 2)), CAST(N'2020-12-01T00:00:00.000' AS DateTime), 1, 1, 3)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (8, 1, CAST(225.00 AS Decimal(5, 2)), CAST(N'2019-12-01T00:00:00.000' AS DateTime), 1, 0, 4)
GO
INSERT [dbo].[Budget] ([id], [holidayId], [budgetAmount], [dateCreated], [isActive], [currentPlan], [userId]) VALUES (9, 1, CAST(75.00 AS Decimal(5, 2)), CAST(N'2018-12-01T00:00:00.000' AS DateTime), 1, 0, 4)
GO
SET IDENTITY_INSERT [dbo].[Budget] OFF
GO
SET IDENTITY_INSERT [dbo].[Gift] ON 
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (1, N'Dad', N'electric toothbrush', CAST(10.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (2, N'Dad', N'gift card', CAST(25.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (3, N'Mom', N'hairdryer', CAST(75.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (4, N'Mom', N'book', CAST(10.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (5, N'Dad', N'electric toothbrush', CAST(10.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (6, N'Dad', N'gift card', CAST(25.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (7, N'Mom', N'hairdryer', CAST(75.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (8, N'Mom', N'book', CAST(10.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (9, NULL, N'easter basket', CAST(10.00 AS Decimal(5, 2)), 1, 5)
GO
INSERT [dbo].[Gift] ([id], [recepient], [item], [price], [isActive], [budgetId]) VALUES (10, NULL, N'candy', CAST(25.00 AS Decimal(5, 2)), 1, 5)
GO
SET IDENTITY_INSERT [dbo].[Gift] OFF
GO
SET IDENTITY_INSERT [dbo].[Holiday] ON 
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (1, N'Christmas')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (2, N'Thanksgiving')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (3, N'Easter')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (4, N'Hanukkah')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (5, N'July 4th')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (6, N'New Years Eve')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (7, N'Halloween')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (8, N'Cinco de Mayo')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (9, N'Dia de los Muertos')
GO
INSERT [dbo].[Holiday] ([id], [holidayName]) VALUES (10, N'Valentines Day')
GO
SET IDENTITY_INSERT [dbo].[Holiday] OFF
GO
SET IDENTITY_INSERT [dbo].[ItemCategory] ON 
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (1, N'Food', N'Turkey', CAST(15.00 AS Decimal(5, 2)), 1, 4)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (2, N'Food', N'Green Beans', CAST(5.00 AS Decimal(5, 2)), 1, 4)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (3, N'Food', N'Sugar', CAST(2.50 AS Decimal(5, 2)), 1, 4)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (4, N'Food', N'Potatoes', CAST(5.25 AS Decimal(5, 2)), 1, 4)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (5, N'Decorations', N'Christmas Tree', CAST(255.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (6, N'Decorations', N'Christmas Tree Lights', CAST(55.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (7, N'Decorations', N'Wrapping Paper', CAST(25.00 AS Decimal(5, 2)), 1, 1)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (8, N'Decorations', N'Christmas Tree', CAST(155.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (9, N'Decorations', N'Christmas Tree Lights', CAST(45.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (10, N'Decorations', N'Wrapping Paper', CAST(35.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (11, N'Food', N'Ham', CAST(25.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (12, N'Food', N'Green Beans', CAST(5.00 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (13, N'Food', N'Sugar', CAST(2.50 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (14, N'Food', N'Potatoes', CAST(5.25 AS Decimal(5, 2)), 1, 2)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (15, N'Party Items', N'Fireworks', CAST(100.00 AS Decimal(5, 2)), 1, 6)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (16, N'Beverages', N'Champagne', CAST(50.00 AS Decimal(5, 2)), 1, 6)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (17, N'Beverages', N'Whiskey', CAST(50.00 AS Decimal(5, 2)), 1, 6)
GO
INSERT [dbo].[ItemCategory] ([id], [categoryName], [itemName], [price], [isActive], [budgetId]) VALUES (18, N'Beverages', N'Sparkling Grape Juice', CAST(10.00 AS Decimal(5, 2)), 1, 6)
GO
SET IDENTITY_INSERT [dbo].[ItemCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 
GO
INSERT [dbo].[Users] ([id], [firstName], [lastName], [email], [password], [isActive]) VALUES (1, N'Stacey              ', N'Stavanger           ', N's.stavenger@gmail.com                             ', N'password1                ', 1)
GO
INSERT [dbo].[Users] ([id], [firstName], [lastName], [email], [password], [isActive]) VALUES (2, N'Eliza               ', N'Kroger              ', N'e.kroger@gmail.com                                ', N'password3                ', 1)
GO
INSERT [dbo].[Users] ([id], [firstName], [lastName], [email], [password], [isActive]) VALUES (3, N'Robert              ', N'Johnson             ', N'r.johnson@gmail.com                               ', N'password2                ', 0)
GO
INSERT [dbo].[Users] ([id], [firstName], [lastName], [email], [password], [isActive]) VALUES (4, N'Thomas              ', N'Jefferson           ', N't.jefferson@gmail.com                             ', N'password4                ', 1)
GO
INSERT [dbo].[Users] ([id], [firstName], [lastName], [email], [password], [isActive]) VALUES (5, N'Bill                ', N'Henry               ', N'b.henry@gmail.com                                 ', N'password5                ', 1)
GO
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
ALTER TABLE [dbo].[Budget]  WITH CHECK ADD  CONSTRAINT [FK__Budget__holidayI__35BCFE0A] FOREIGN KEY([holidayId])
REFERENCES [dbo].[Holiday] ([id])
GO
ALTER TABLE [dbo].[Budget] CHECK CONSTRAINT [FK__Budget__holidayI__35BCFE0A]
GO
ALTER TABLE [dbo].[Budget]  WITH CHECK ADD  CONSTRAINT [FK__Budget__userId__34C8D9D1] FOREIGN KEY([userId])
REFERENCES [dbo].[Users] ([id])
GO
ALTER TABLE [dbo].[Budget] CHECK CONSTRAINT [FK__Budget__userId__34C8D9D1]
GO
ALTER TABLE [dbo].[Gift]  WITH CHECK ADD  CONSTRAINT [FK__Gift__budgetId__38996AB5] FOREIGN KEY([budgetId])
REFERENCES [dbo].[Budget] ([id])
GO
ALTER TABLE [dbo].[Gift] CHECK CONSTRAINT [FK__Gift__budgetId__38996AB5]
GO
ALTER TABLE [dbo].[ItemCategory]  WITH CHECK ADD  CONSTRAINT [FK__ItemCateg__budge__3B75D760] FOREIGN KEY([budgetId])
REFERENCES [dbo].[Budget] ([id])
GO
ALTER TABLE [dbo].[ItemCategory] CHECK CONSTRAINT [FK__ItemCateg__budge__3B75D760]
GO
USE [master]
GO
ALTER DATABASE [HolidayBudgetPlanner] SET  READ_WRITE 
GO
