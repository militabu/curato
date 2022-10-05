/// <reference types="cypress" />
import moment from 'moment';

describe('Testing works', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Landing page contains elements', () => {
    cy.contains('Curato')
    cy.contains('Albums')
    cy.contains('Contacts')
    cy.contains('Favorites')
    cy.contains('Settings')
    cy.get("[data-testid='toggleAlbumEdit-btn']").should('exist')
  })

  //  click into ToggleEditAlbum button
  it('Click into the toggleEditAlbum button and form elements exist',()=> {
    cy.get("[data-testid='toggleAlbumEdit-btn']").click()
    cy.contains('New Album')
    cy.contains('Save')
    // form elements
    cy.get('#imageForm').should('exist')
    cy.get('#imageForm > input').eq(0).invoke('attr','name').should('contain','title')
    cy.get('#imageForm > input').eq(1).invoke('attr','name').should('contain','date')
    cy.get('#imageForm > input').eq(2).invoke('attr','name').should('contain','description')
  })

  // click into ToggleImageEdit form and submit
  it('Click into the toggleEditAlbum button and submit form with photo',()=> {
    cy.get("[data-testid='toggleAlbumEdit-btn']").click()
    cy.get('#imageForm > input').eq(0).type('test1')
    cy.get('#imageForm > input').eq(1).invoke('val').then((text)=> {
      expect(moment(Date.now()).format("DD/MM/YYYY")).to.equal(moment(text).format('DD/MM/YYYY'))
    })
    cy.get('#imageForm > input').eq(2).type('test-album')
    cy.get("[data-testid='image-upload-0']").get("input[type=file]").eq(0).click({force:true}).selectFile('./cypress/fixtures/beach.jpg',{force:true})
    cy.get("button[type='submit']").click()
  })

})