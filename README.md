# cadastro de carro

**Requisitos funcionais**
[x] Deve ser possível cadastrar um novo carro.
**Requisitos não funcionais**
Não há
**Regras de negócio**
[x] Não deve ser possível cadastrar um carro com uma placa já existente.
[x] O carro deve ser cadastrado com disponibilidade=true por padrão.
[x] O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**Requisitos funcionais**
[x] Deve ser possível listar todos os carros disponíveis.
[x] deve ser possível listar todos os carros pelo nome da categoria.
[x] deve ser possível listar todos os carros pelo nome da marca.
[x] deve ser possível listar todos os carros pelo nome do carro.
**Requisitos não funcionais**
Não há
**Regras de negócio**
[x] O usuário não precisa estar logado no sistema para listar os carros.

# Cadastro de especificação no carro

**Requisitos funcionais**
[x] Deve ser possível cadastrar uma especificação para um carro.

**Requisitos não funcionais**
Não há
**Regras de negócio**
[x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
[] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
[x] o usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**Requisitos funcionais**
[x] Deve ser possível cadastrar a imagem do carro
**Requisitos não funcionais**
[x] utilizar o multer para upload dos arquivos
**Regras de negócio**
[x] O usuário pode cadastrar mais de uma imagem para o mesmo carro.
[x] o usuário responsável pelo cadastro deve ser um administrador.

# Alugar o carro

**Requisitos funcionais**
[x] Deve ser possível cadastrar um aluguel
**Regras de negócio**
[x] O aluguel deve ter duração mínima de 24 hora.
[x] não deve ser possível cadastrar um novo aluguel caso já exista um aberto
para o mesmo usuário.
[x] não deve ser possível cadastrar um novo aluguel caso já exista um aberto
para o mesmo carro.
[x] O usuário deve estar logado na aplicação

# Devolução do carro

**Requisitos funcionais**
[x] Deve ser possível realizar a devolução de um carro
**Regras de negócio**
[x] se o carro for devolvido com menos de 24horas, deverá cobrar a diária completa.
[x] Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
[x] Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
[x] Ao realizar a devolução, deverá ser calculado o total do aluguel.
[x] Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcionou aos dias de atraso.
[x] caso haja multa, deverá ser somado ao total do aluguel
[x] O usuário deve estar logado na aplicação

# Listagem de alugueis para usuário

**RF**
[x]Deve ser possível realizar a busca de todos os alugueis para o usuário
**RN**
[x]o usuário deve estar logado na aplicação

# recuperar senha

**RF**
[] deve ser possível o usuário recuperar a senha informando o e-email
[] O usuário deve receber um e-email com o passo a passo para a recuperação da senha
[] O Usuário deve conseguir inserir uma nova senha
**RN**
[] o usuário precisa informar uma nova senha
[x] o link enviado para a recuperação deve expirar em 3 horas
