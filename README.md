# 🚀 Getting Started

Welcome to ChronoQuest! This guide will help you navigate the codebase and understand what you need to implement.

## 📋 Quick Start Checklist

- [ ] Run `pnpm install` to install dependencies
- [ ] Run `pnpm start` to run the server and explore the Apollo Sandbox on [http://localhost:10101/](http://localhost:10101/)
- [ ] Run `pnpm test` to see current test status

## 🎯 What You're Building

You're implementing a GraphQL API for a time-travel booking agency. The system handles:

- **Travelers**: People who want to travel through time
- **Bookings**: Time-travel reservations
- **Time Periods**: Historical destinations (Ancient Egypt, Medieval Europe, etc.)

## 🧪 Test Guide

**Test File**: [src/tasks.spec.ts](src/tasks.spec.ts#L73)  
**Run Tests**: `pnpm test`  
**Goal**: Implement the missing functionality to make all tests pass  

### Tasks

1. **Query all travelers**
    - [x] ✅ Already implemented
2. **Query a traveler by ID**
    - [ ] 🔧 Add a 'traveler' query that takes an 'id' parameter
3. **Get the traveler's name in all CAPs**
    - [ ] 🔧 Implement resolver argument handling for the traveler query
4. **Create a new booking**
    - [ ] 🔧 Create a mutation that handles booking creation
5. **Find why BookingError is not resolving**
    - [ ] 🔧 Fix the union type resolution issue
6. **Implement the Person interface**
    - [ ] 🔧 Resolve the Person interface to distinguish Traveler vs Guide
7. **Get a traveler's bookings**
    - [ ] 🔧 Implement resolver chains for the traveler's active bookings
8. **Get bookings for an authenticated user**
    - [ ] 🔧 Implement authentication and authorization for the bookings query
9. **Get departures from the EasyDeLorean API**
    - [ ] 🔧 Implement resilient service to service communication to fulfill the departures query
10. **Optimize database calls for a booking**
    - [ ] 🔧 Solve the n+1 problem for the booking query

## 💡 Pro Tips

1. **Read the schema first** - It tells you exactly what types and fields exist
2. **Look at existing implementations** - The working tests show patterns to follow
3. **Use TypeScript** - The type system will guide you to correct implementations
4. **Run tests frequently** - `pnpm test` will start vitest in watch mode so you can track your progress
5. **Don't overthink it** - Start simple and iterate

## 🆘 When You're Stuck

1. **Check the schema** - What fields/types are defined?
2. **Look at working examples** - How are similar resolvers implemented?
3. **Read test expectations** - What should the output look like?
4. **Use TypeScript errors** - They often point to the right solution
5. **Explore in the Apollo Sandbox** - `pnpm start` will run the [Apollo Sandbox](http://localhost:10101/) for interacting with your schema
6. **Encode your own tokens** - use the encoder at [jwt.io](https://www.jwt.io/) to help with testing authentication
