# VPC
resource "aws_vpc" "partager-vpc" {
  cidr_block = "10.1.0.0/16"
  tags = {
    Name = "partager"
  }
}

# サブネット
resource "aws_subnet" "partager-public-subnet-1a" {
  cidr_block = "10.1.11.0/24"
  vpc_id = aws_vpc.partager-vpc.id
  map_public_ip_on_launch = true
  tags = {
    Name = "partager-public-a"
  }
}

resource "aws_subnet" "partager-private-subnet-1a" {
  cidr_block = "10.1.15.0/24"
  vpc_id = aws_vpc.partager-vpc.id
  tags = {
    Name = "partager-private-a"
  }
}

resource "aws_subnet" "partager-public-subnet-1c" {
  cidr_block = "10.1.51.0/24"
  vpc_id = aws_vpc.partager-vpc.id
  map_public_ip_on_launch = true
  tags = {
    Name = "partager-public-c"
  }
}

resource "aws_subnet" "partager-private-subnet-1c" {
  cidr_block = "10.1.55.0/24"
  vpc_id = aws_vpc.partager-vpc.id
  tags = {
    Name = "partager-private-c"
  }
}

# ルートテーブル
resource "aws_route_table" "partager-public-route-table" {
  vpc_id = aws_vpc.partager-vpc.id
  tags = {
    Name = "partager-public-route-table"
  }
}

resource "aws_route_table_association" "public-1a" {
  subnet_id = aws_subnet.partager-public-subnet-1a.id
  route_table_id = aws_route_table.partager-public-route-table.id
}

resource "aws_route_table_association" "public-1c" {
  subnet_id = aws_subnet.partager-public-subnet-1c.id
  route_table_id = aws_route_table.partager-public-route-table.id
}

# インターネットゲートウェイ
resource "aws_internet_gateway" "partager-internet-gateway" {
  vpc_id = aws_vpc.partager-vpc.id
  tags = {
    Name = "partager-internet-gateway"
  }
}

