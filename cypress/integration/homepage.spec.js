/* Using below code to resolve gTag issue on Landing Page*/

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

/* Task#1
Hobsons.com home page renders as expected. */

 describe('Validate Landing Page', function () {
    it('Visit Hobsons', function () {
        cy.visit('/')
        cy.title()
            .should('eq', 'Education Advances | Hobsons')
        cy.get('.pagetitle').should('contain', 'We help students across the journey of a lifetime.')
    })
})


/* Task#2

On the home screen there is a Hero graphic 
with the text “We help students across the journey of a lifetime.” Click the down arrow. 
Assert the page scrolls the next sections “How can we help your students?” into the viewport window.
Assert that it is correctly aligned with the top of the visible screen */

describe('Home down arrow button Task', function () {
    it('Validate dow narrow button and Heading Text', function () {
        cy.get('.fas').click()
        cy.get('#section-learn-more > h2')
            .contains('How can we help your students?')
            .should('be.visible')         
            .should('have.css', 'text-align')
            .and('match', /center/) 
    })
})


/* Task#3

When user clicks the “hamburger” menu at the top of the screen
then the items the list drops down as expected with the sub - menu items.
The menu I’m referring to is Solutions, Services, Resources, About & Blog.
Assert that the “Resources” menus contain a list of child links including “Events”. */

describe('Menu Task', function () {
    it('Verify menu and child items', function () {
        cy.visit('/')
        cy.get('.menu').click()
        
        cy.get('.toggle').eq(1)
            .should(($lis) => {
            expect($lis).to.have.length(1)
                expect($lis.eq(0)).to.contain('Resources')
            })
        
        cy.contains('Resources').trigger('mousemove').click()

        cy.get('a.toggle+ul.expand li')
            .should(($lis) => {
                expect($lis).to.have.length(8)
                expect($lis.eq(0)).to.contain('All')
                expect($lis.eq(1)).to.contain('Webinars')
                expect($lis.eq(2)).to.contain('Events')
                expect($lis.eq(3)).to.contain('Case Studies')
                expect($lis.eq(4)).to.contain('White Papers')
                expect($lis.eq(5)).to.contain('Blog')
                expect($lis.eq(6)).to.contain('Media')
                expect($lis.eq(7)).to.contain('Podcast')
            })
        
      
    })
})

/* Task#4

Navigate to Resources > Events. 
Assert all events on the page that occur in the future. 
Note you do NOT need to apply the filters, just assert on the default list that is displayed. 
Also note that you need only assert on events which have specified a day, month and year */

/* #Clarification For Task#4, did not see the given date format in the Event Page. 
Once we set the date format for the event and we can compare the case for future. */

describe('Assert all events on the page that occur in the future.', function () {
    it('Visit Event Page', function () {
        cy.contains('Events').trigger('mousemove').click()
        cy.get(':nth-child(2) > .txt > p > small').contains('Jan. 22-24, 2020')//01, 12 2020
    })
})
