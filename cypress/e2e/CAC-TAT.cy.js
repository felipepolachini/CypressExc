describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
      cy.visit('./src/index.html')
    }
  )
  it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=>{
      const longText = Cypress._.repeat('Obrigado! ', 10)

      cy.get('#firstName').type('Teste')
      cy.get('#lastName').type('QA')
      cy.get('#email').type('email@teste.com')
      cy.get('#open-text-area').type(longText ,{delay:0})
      cy.get('.button[type="submit"]').click()
      cy.get('.success').should('be.visible').should('contain', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=>{
      cy.get('#firstName').type('Teste')
      cy.get('#lastName').type('QA')
      cy.get('#email').type('email@teste,com')
      cy.get('#open-text-area').type('Teste')
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible').should('contain', 'Valide os campos obrigatórios!')
  })

  it('campo telefonico continua vazio quando preenchido com valor não numérico', ()=>{
      cy.get('#phone').type('abcdefghij').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
      cy.get('#firstName').type('Teste')
      cy.get('#lastName').type('QA')
      cy.get('#email').type('XXXXXXXXXXXXXXX')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste')
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible').should('contain', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
      cy.get('#firstName').type('Teste').should('have.value','Teste').clear().should('have.value', '')
      cy.get('#lastName').type('QA').should('have.value', 'QA').clear().should('have.value', '')
      cy.get('#email').type('email@teste.com').should('have.value', 'email@teste.com').clear().should('have.value', '')
      cy.get('#phone').type('99999999').should('have.value', '99999999').clear().should('have.value', '')
      cy.get('#phone-checkbox').check()
      cy.get('#open-text-area').type('Teste').should('have.value', 'Teste').clear().should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
      cy.get('.button[type="submit"]').click()
      cy.get('.error').should('be.visible').should('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formuário com sucesso usando um comando customizado', ()=>{
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible').should('contain', 'Mensagem enviada com sucesso.')
  })

  it('seleciona um produto (YouTube) por seu texto', ()=>{
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', ()=>{
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })

 it('marca o tipo de atendimento "Feedback"',()=>{
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
 })

 it('marca cada tipo de atendimento', ()=>{
    cy.get('input[type="radio"]').should('have.length', 3).each(service=>{
        cy.wrap(service).check().should('be.checked')
    })
 })

 it('marca ambos checkboxes, depois desmarca o último', ()=>{
    cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
 })

 it('seleciona um arquivo da pasta fixtures', ()=>{
    cy.get('#file-upload').selectFile('/cypress/fixtures/example.json').should(result=>{
        expect(result[0].name).to.equal('example.json')
        expect(result[0].type).to.equal('application/json')
    })
 })

 it.only('seleciona um arquivo simulando um drag-and-drop', ()=>{
    cy.get('#file-upload').selectFile('C:/curso-cypress/CypressExc/cypress/fixtures/example.json', {action: 'drag-drop'}).should(result=>{
        expect(result[0].name).to.equal('example.json')
        expect(result[0].type).to.equal('application/json')
    })
 })

 it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json', null).as('input')
    cy.get('#file-upload').selectFile('@input', {action: 'drag-drop'}).should(result=>{
        expect(result[0].name).to.equal('example.json')
        expect(result[0].type).to.equal('application/json')
    })
 })

 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
    cy.contains('a','Política de Privacidade').should('have.attr', 'href','privacy.html' ).and('have.attr','target','_blank')
 })

 it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
    cy.contains('a','Política de Privacidade').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')
 })


})
