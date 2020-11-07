-- MySQL Script generated by MySQL Workbench
-- sex 06 nov 2020 23:19:28
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ProjetoIntegrador
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ProjetoIntegrador
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ProjetoIntegrador` DEFAULT CHARACTER SET utf8 ;
USE `ProjetoIntegrador` ;

-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Nome` VARCHAR(100) NULL,
  `Email` VARCHAR(100) NULL,
  `Sub` VARCHAR(255) NULL,
  `Logo` VARCHAR(100) NULL,
  `URL` VARCHAR(100) NULL,
  `Premium` CHAR(255) NULL,
  `TimeZone` VARCHAR(100) NULL,
  `NomeDeExibicao` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Eventos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Usuarios_id` INT NOT NULL,
  `NomeEvento` VARCHAR(100) NULL,
  `Duracao` INT NULL,
  `Exibicao` INT NULL,
  `URL` VARCHAR(255) NULL,
  `TimeZone` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Eventos_Usuarios_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Eventos_Usuarios`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `ProjetoIntegrador`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`DiaSemana`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`DiaSemana` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`IntervaloDisponibilidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`IntervaloDisponibilidade` (
  `id` INT NOT NULL,
  `Inicio` VARCHAR(100) NULL,
  `Fim` VARCHAR(100) NULL,
  `DiaSemana_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_IntervaloDisponibilidade_DiaSemana1_idx` (`DiaSemana_id` ASC) VISIBLE,
  CONSTRAINT `fk_IntervaloDisponibilidade_DiaSemana1`
    FOREIGN KEY (`DiaSemana_id`)
    REFERENCES `ProjetoIntegrador`.`DiaSemana` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Agendamento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Agendamento` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `HorarioAgendadoInicio` VARCHAR(100) NULL,
  `HoraioAgendadoFim` VARCHAR(100) NULL,
  `GoogleID` VARCHAR(100) NULL,
  `Eventos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Agendamento_Eventos1_idx` (`Eventos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Agendamento_Eventos1`
    FOREIGN KEY (`Eventos_id`)
    REFERENCES `ProjetoIntegrador`.`Eventos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Session`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Session` (
  `id` INT NOT NULL,
  `Usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Session_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Session_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `ProjetoIntegrador`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Eventos_has_IntervaloDisponibilidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Eventos_has_IntervaloDisponibilidade` (
  `Eventos_id` INT NOT NULL,
  `IntervaloDisponibilidade_id` INT NOT NULL,
  PRIMARY KEY (`Eventos_id`, `IntervaloDisponibilidade_id`),
  INDEX `fk_Eventos_has_IntervaloDisponibilidade_IntervaloDisponibil_idx` (`IntervaloDisponibilidade_id` ASC) VISIBLE,
  INDEX `fk_Eventos_has_IntervaloDisponibilidade_Eventos1_idx` (`Eventos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Eventos_has_IntervaloDisponibilidade_Eventos1`
    FOREIGN KEY (`Eventos_id`)
    REFERENCES `ProjetoIntegrador`.`Eventos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Eventos_has_IntervaloDisponibilidade_IntervaloDisponibilid1`
    FOREIGN KEY (`IntervaloDisponibilidade_id`)
    REFERENCES `ProjetoIntegrador`.`IntervaloDisponibilidade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Acessos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Acessos` (
  `id` INT NOT NULL,
  `AccessToken` VARCHAR(255) NULL,
  `RefreshToken` VARCHAR(255) NULL,
  `Usuarios_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Acessos_Usuarios1_idx` (`Usuarios_id` ASC) VISIBLE,
  CONSTRAINT `fk_Acessos_Usuarios1`
    FOREIGN KEY (`Usuarios_id`)
    REFERENCES `ProjetoIntegrador`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Regras`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Regras` (
  `id` INT NOT NULL,
  `NomeDaRegra` VARCHAR(100) NULL,
  `Valor` INT NULL,
  `Status` TINYINT NULL,
  `Eventos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Regras_Eventos1_idx` (`Eventos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Regras_Eventos1`
    FOREIGN KEY (`Eventos_id`)
    REFERENCES `ProjetoIntegrador`.`Eventos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Perguntas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Perguntas` (
  `id` INT NOT NULL,
  `Pergunta` VARCHAR(100) NULL,
  `Eventos_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Perguntas_Eventos1_idx` (`Eventos_id` ASC) VISIBLE,
  CONSTRAINT `fk_Perguntas_Eventos1`
    FOREIGN KEY (`Eventos_id`)
    REFERENCES `ProjetoIntegrador`.`Eventos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ProjetoIntegrador`.`Respostas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ProjetoIntegrador`.`Respostas` (
  `Perguntas_id` INT NOT NULL,
  `Agendamento_id` INT NOT NULL,
  `Valores` VARCHAR(45) NULL,
  PRIMARY KEY (`Perguntas_id`, `Agendamento_id`),
  INDEX `fk_Perguntas_has_Agendamento_Agendamento1_idx` (`Agendamento_id` ASC) VISIBLE,
  INDEX `fk_Perguntas_has_Agendamento_Perguntas1_idx` (`Perguntas_id` ASC) VISIBLE,
  CONSTRAINT `fk_Perguntas_has_Agendamento_Perguntas1`
    FOREIGN KEY (`Perguntas_id`)
    REFERENCES `ProjetoIntegrador`.`Perguntas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Perguntas_has_Agendamento_Agendamento1`
    FOREIGN KEY (`Agendamento_id`)
    REFERENCES `ProjetoIntegrador`.`Agendamento` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;