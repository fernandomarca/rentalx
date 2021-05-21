# cadastro de carro

**Requisitos funcionais**
Deve ser possível cadastrar um novo carro.
Deve ser possível listar todas as categorias.
**Requisitos não funcionais**
Não há
**Regras de negócio**
Não deve ser possível cadastrar um carro com uma placa já existente.
Não deve ser possível alterar a placa de um carro.
O carro deve ser cadastrado com disponibilidade=true por padrão.
O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**Requisitos funcionais**
Deve ser possível listar todos os carros disponíveis.
deve ser possível listar todos os carros pelo nome da categoria.
deve ser possível listar todos os carros pelo nome da marca.
deve ser possível listar todos os carros pelo nome do carro.
**Requisitos não funcionais**
Não há
**Regras de negócio**
O usuário não precisa estar logado no sistema para listar os carros.

# Cadastro de especificação no carro

**Requisitos funcionais**
Deve ser possível cadastrar uma especificação para um carro.
Deve ser possível listar todas as especificações.
deve ser possível listar todos os carros
**Requisitos não funcionais**
Não há
**Regras de negócio**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
o usuário responsável pelo cadastro deve ser um administrador.

# Cadastro de imagens do carro

**Requisitos funcionais**
Deve ser possível cadastrar a imagem do carro
deve ser possível listar todos os carros.
**Requisitos não funcionais**
utilizar o multer para upload dos arquivos
**Regras de negócio**
O usuário pode cadastrar mais de uma imagem para o mesmo carro.
o usuário responsável pelo cadastro deve ser um administrador.

# Alugar o carro

**Requisitos funcionais**
Deve ser possível cadastrar um aluguel

**Requisitos não funcionais**
utilizar o multer para upload dos arquivos
**Regras de negócio**
O aluguel deve ter duração mínima de 24 hora.
não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
