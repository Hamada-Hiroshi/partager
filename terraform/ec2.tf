# EC2
resource "aws_instance" "partager-web-server" {
  ami = "ami-09ebacdc178ae23b7"
  instance_type = "t2.micro"
  subnet_id = aws_subnet.partager-public-subnet-1a.id
  vpc_security_group_ids = [aws_security_group.partager-web-sg.id]
  tags = {
    Name = "partager-instance"
  }
}

# セキュリティグループ
resource "aws_security_group" "partager-web-sg" {
  vpc_id = aws_vpc.partager-vpc.id
  name = "partager-web-sg"
  description = "Partager Web APP Security Group"
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
