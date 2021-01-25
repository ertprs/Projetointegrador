INSERT INTO projetointegrador.usuarios
    (nome, email, sub, logo, url, premium, timeZone, nomeDeExibicao)
VALUES
    ('Iago Nunes', 'iago@gmail.com','123456','tese','iago','true','brasil','Iago'),
    ('Caio', 'caio@gmail.com','12345','tese','caio','true','brasil','Caio'),
    ('Alexandre', 'alexandre@gmail.com','12345','tese','alexandre','true','brasil','Alexandre');
    
    INSERT INTO projetointegrador.disponibilidade
    (nome,usuarios_id )
VALUES
    ('disponibilidade1',1),
 	('disponibilidade2',2),
    ('disponibilidade3',3);

    
    
    
INSERT INTO projetointegrador.eventos
    (usuarios_id,nomeEvento, duracao, exibicao,url ,timeZone,disponibilidade_id  )
VALUES
    (1, 'Iagoevento',30,60,'iago','brasil',1),
    (2, 'Caioevento',30,60,'caio','brasil',1),
    (3, 'Alexandreevento',30,60,'alexandre','brasil',2);

INSERT INTO projetointegrador.perguntas
    (pergunta, eventos_id )
VALUES
    ('Pergunta1', 1),
	('Pergunta2', 1),
	('Pergunta3', 1),
    ('Pergunta1', 2),
	('Pergunta2', 2),
	('Pergunta3', 2),
    ('Pergunta1', 3),
	('Pergunta2', 3),
	('Pergunta3', 3);
    
INSERT INTO projetointegrador.agendamento
    (horarioAgendadoInicio,horaioAgendadoFim, googleID, eventos_id,clienteNome,clienteEmail,clienteTelefone )
VALUES
    ('08:00', '12:00','12345','1','iago','iago@hotmail.com',"7991916922"),
	('08:00', '12:00','12345','1','iago','iago@hotmail.com',"7991916922"),
	('08:00', '12:00','12345','1','iago','iago@hotmail.com',"7991916922"),
    ('08:00', '12:00','12345','2','Caio','Caio@hotmail.com',"7991916911"),
	('08:00', '12:00','12345','2','Caio','Caio@hotmail.com',"7991916911"),
	('08:00', '12:00','12345','2','Caio','Caio@hotmail.com',"7991916922"),
	('08:00', '12:00','12345','3','Alexandre','Alexandre@hotmail.com',"7991916933"),
	('08:00', '12:00','12345','3','iago','Alexandre@hotmail.com',"7991916933"),
	('08:00', '12:00','12345','3','iago','Alexandre@hotmail.com',"7991916933");
    
INSERT INTO ProjetoIntegrador.regras
    (nomeDaRegra, valor, status, eventos_id)
VALUES
    ('Teste1', 111, 0, 1),
    ('Teste2', 222, 1, 2),
    ('Teste3', 333, 1, 3);
    
INSERT INTO projetointegrador.diasemana
    (nome)
VALUES
    ("Domingo"), ("Segunda"), ("Terça"), ("Quarta"), ("Quinta"), ("Sexta"), ("Sábado");
    
    INSERT INTO projetointegrador.intervalodisponibilidade     
	(inicio, fim, diasemana_id) 
VALUES  
	("10:00", "12:00", 1),      
	("13:00", "20:00" , 1),     
	("08:00", "13:00", 2),     
	("14:00", "20:00", 2)
