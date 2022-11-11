# Overview
Plant Board was created for personal use to help keep on top of home plant care in a simplified and 
straightforward way. It is digital recreation of the white board that was my previous way of keeping track of plant 
watering dates. All information on your plants is shown in one large summary view sorted by most recently watered date.

### Current Features:
- Creating/Editing/Deleting plant information including
  - Plant Nickname
  - Plant Common Name
  - Purchase Date
  - Watering Instructions
  - Notes
- Quick way to add water date to each plant
- Radix tooltips for plant info and actions on summary view 
- Mobile/Desktop views

### Features To Come:
- Authentication module to support user sign in with separate plant data
- Fully fleshed out form validation
- Bulk watering option so multiple plants can be marked as water on the same day
- Customization of what plant fields are visible in summary view
- Water frequency field to indicate how often plant should be watered, with visual cues when it is out of date
- Fertilization frequency field similar to the water frequency field
- Water date feature expansion to view/edit all past water dates

# Live Demo
Demo environment is available at: https://plant-board.vercel.app/board

Feel free to mess around here to your heart's content as I have a separate environment with my personal data until 
auth/user features are added.

# Stack
This is an app bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

Main Components Include:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Radix](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)

# Local Set Up
### Prerequisites
- Must have a local postgres installation set up

### Initial Set Up
- Create a .env file at the root folder</li>
- Add `DATABASE_URL` variable with your postgres connection string like so:
  - ```DATABASE_URL="postgres://<database_username>:<database_userpassword>@<hostaddress>:<port_no>/<database_name>"```
  - Note: `database_name` does not need to be manually created, prisma can handle that
-  Run the postinstall script to set up the database with prisma: `npm run postinstall`

### Start Up
Simply use npm to call the dev script to start the NextJs process: `npm run dev`

