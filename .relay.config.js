module.exports = {
  src: './src',
  schema: './src/data/schema.graphql',
  exclude: [
    '**/node_modules/**',
    '**/__generated__/**',
    '**/pages/fortune-wheel-fast-125.tsx',
    '**/pages/fortune-wheel-fast-125-50fs.tsx',
    '**/pages/fortune-wheel-long-125.tsx',
    '**/pages/fortune-wheel-long-125-50fs.tsx',
  ],
  language: 'typescript',
  artifactDirectory: 'src/queries/__generated__',
  schemaExtensions: ['./src/data'],
};
