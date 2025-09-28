# 🚀 Getting Started

Welcome to ChronoQuest! This guide will help you navigate the codebase and understand what you need to implement.

## 📋 Quick Start Checklist

- [ ] Run `pnpm install` to install dependencies
- [ ] Run `pnpm run test` to see current test status

## 🎯 What You're Building

You're implementing a GraphQL API for a time-travel booking agency. The system handles:

- **Travelers**: People who want to travel through time
- **Bookings**: Time-travel reservations
- **Time Periods**: Historical destinations (Ancient Egypt, Medieval Europe, etc.)

## 🧪 Test Guide

**File**: `src/tasks.spec.ts`  
**Goal**: Implement core GraphQL functionality

1. **Query all travelers** ✅ (Already working)
2. **Query a traveler by ID** - 🔧 TASK: Add a 'traveler' query that takes an 'id' parameter
3. **Create a new booking** - 🔧 TASK: Create a mutation that handles booking creation
4. **Find why BookingError is not resolving** - 🔧 TASK: Fix the union type resolution issue
5. **Implement the Person interface** - 🔧 TASK: Resolve the Person interface to distinguish Traveler vs Guide
6. **Get a traveler's bookings** - 🔧 TASK: Implement resolver chains for the traveler's active bookings
7. **Get bookings for an authenticated user** - 🔧 TASK: Implement authentication and authorization for the bookings query
8. **Get the traveler's name in all CAPs** - 🔧 TASK: Implement resolver argument handling  for the traveler query
9. **Optimize database calls for a booking** - 🔧 TASK: Solve the n+1 problem for the booking query

## 💡 Pro Tips

1. **Read the schema first** - It tells you exactly what types and fields exist
2. **Look at existing implementations** - The working tests show patterns to follow
3. **Use TypeScript** - The type system will guide you to correct implementations
4. **Run tests frequently** - `pnpm run test` after each change
5. **Don't overthink it** - Start simple and iterate

## 🆘 When You're Stuck

1. **Check the schema** - What fields/types are defined?
2. **Look at working examples** - How are similar resolvers implemented?
3. **Read test expectations** - What should the output look like?
4. **Use TypeScript errors** - They often point to the right solution
