/// <reference types="cypress" />

describe('Basic Test', () => {

  beforeEach(() => {
    cy.viewport(1280, 720)
    // should be the url of the todo app
    cy.visit('https://vue-todo-list-5970d.web.app/') // todo-app(firebase hosted)
  })

  it('Should display error message when input is empty', () => {
    cy.contains('Please type something').should('not.exist')
    cy.get('[data-testid=todoInput]').invoke('val', '')
    cy.get('[data-testid=btnSubmit]').click()
    cy.contains('Please type something').should('exist')
  })

  it('Should add new todo item', () => {
    const random = Math.random().toString().slice(0, 3)
    cy.contains(`todo-${random}`).should('not.exist')
    cy.get('[data-testid=todoInput]').type(`todo-${random}`)
    cy.get('[data-testid=btnSubmit]').click()
    cy.contains(`todo-${random}`, {timeout: 3 * 1000}).should('exist')
  })

  it('Should display confirm delete', () => {
    cy.contains('Are you sure you want to delete?').should('not.exist')
    cy.get('[data-testid=btnDelete-0').click()
    cy.contains('Are you sure you want to delete?').should('exist')
  })

  it('Should delete a todo item', () => {
    const random = Math.random().toString().slice(0, 3)
    cy.contains(`todo-${random}`).should('not.exist')
    cy.get('[data-testid=todoInput]').type(`todo-${random}`)
    cy.get('[data-testid=btnSubmit]').click()
    cy.contains(`todo-${random}`).should('exist')
    cy.contains('Are you sure you want to delete?').should('not.exist')
    cy.get('[data-testid=btnDelete-0').click()
    cy.contains('Are you sure you want to delete?').should('exist')
    cy.get('[data-testid=deleteTodo]').click()
    cy.contains(`todo-${random}`, {timeout: 3 * 1000}).should('not.exist')
  })
})



