# DBサブネットグループ
resource "aws_db_subnet_group" "partager-db-subnet" {
  name = "partager-dbsubnet"
  description = "Partager DB Subnet"
  subnet_ids = [aws_subnet.partager-private-subnet-1a.id, aws_subnet.partager-private-subnet-1c.id]
}

# DBパラメータグループ
resource "aws_db_parameter_group" "db-pg" {
  name = "standard-pg"
  family = "mysql8.0"
  description = "MySQL8.0 Standard Parameter Group"
  parameter {
    name = "character_set_client"
    value = "utf8mb4"
  }
  parameter {
    name = "character_set_connection"
    value = "utf8mb4"
  }
  parameter {
    name = "character_set_database"
    value = "utf8mb4"
  }
  parameter {
    name = "character_set_filesystem"
    value = "utf8mb4"
  }
  parameter {
    name = "character_set_results"
    value = "utf8mb4"
  }
  parameter {
    name = "character_set_server"
    value = "utf8mb4"
  }
  parameter {
    apply_method = "pending-reboot"
    name = "skip-character-set-client-handshake"
    value = "1"
  }
}

# セキュリティグループ
resource "aws_security_group" "partager-db-sg" {
  vpc_id = aws_vpc.partager-vpc.id
  name = "partager-db-sg"
  description = "Partager MySQL Security Group"
  ingress {
    from_port = 3306
    to_port = 3306
    protocol = "tcp"
    security_groups  = [aws_security_group.partager-web-sg.id]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# RDS
resource "aws_db_instance" "partager-db" {
  identifier = "partager-mysql"
  allocated_storage = 20
  engine = "mysql"
  engine_version = "8.0.23"
  instance_class = "db.t2.micro"
  db_subnet_group_name = aws_db_subnet_group.partager-db-subnet.name
  parameter_group_name = aws_db_parameter_group.db-pg.name
  vpc_security_group_ids = [aws_security_group.partager-db-sg.id]
  multi_az = false
  monitoring_interval = 60
  skip_final_snapshot = true
  enabled_cloudwatch_logs_exports = [
    "audit",
    "error",
    "general",
    "slowquery"
  ]
}
