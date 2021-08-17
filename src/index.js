module.exports = function solveSudoku(matrix) {
	//Regulate the size of the matrix
	const size = 9
	const boxSize = 3

	//Find 'no value' element => [row, col] || null
	const findEmpty = (matrix) => {
		for (let r = 0; r < size; r++) {
			for (let c = 0; c < size; c++) {
				if (matrix[r][c] === 0) {
					return [r, c]
				}
			}
		}
		return null
	}

	//Check whether current number being inserted at the current position will allow further solving the board 
	const validate = (num, pos, matrix) => {
		const [r, c] = pos

		//Check rows
		for (let i = 0; i < size; i++) {
			if (matrix[i][c] === num && i !== r) {
				return false
			}
		}

		//Check cols
		for (let i = 0; i < size; i++) {
			if (matrix[r][i] === num && i !== c) {
				return false
			}
		}

		//Check box
		const boxRow = Math.floor( r/boxSize) * boxSize
		const boxCol = Math.floor( c/boxSize) * boxSize

		for (let i = boxRow; i < boxRow + boxSize; i++) {
			for (let j = boxCol; j < boxCol + boxSize; j++) {
				if (matrix[i][j] === num && i !== r && j !== c) {
					return false
				}
			}
		}

		return true
	}

	//Main function
	const solve = () => {
		const currPos = findEmpty(matrix)

		if (currPos === null) {
			return true
		}

		for (let i = 1; i < size + 1; i++) {
			const currNum = i
			const isValid = validate(currNum, currPos, matrix)
		

			if (isValid) {
				const [x, y] = currPos
				matrix[x][y] = currNum

				//Recursion
				if (solve()) {
					return true
				}

				matrix[x][y] = 0
			}
		}

		return false
	}

	solve()
	return matrix
}