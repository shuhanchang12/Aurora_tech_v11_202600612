provider "aws" {
  region = "eu-west-1"
}

resource "aws_db_instance" "postgres_dwh" {
  allocated_storage    = 100
  storage_type         = "gp3"
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.medium"
  identifier           = "auroratech-prod-dwh"
  username             = "admin"
  password             = "securepassword123"
  parameter_group_name = "default.postgres15"
  skip_final_snapshot  = true
  publicly_accessible  = false
  vpc_security_group_ids = [aws_security_group.dwh_sg.id]
  
  tags = {
    Environment = "Production"
    Project     = "AuroraTech"
  }
}

resource "aws_security_group" "dwh_sg" {
  name        = "auroratech-dwh-sg"
  description = "Allow private access to PostgreSQL"

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Private VPC CIDR only
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
