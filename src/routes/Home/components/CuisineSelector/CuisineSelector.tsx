import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { List } from 'react-feather';

import { Classes } from './styles';
import { Cuisine } from '../../../../types/constants';
import { Text, Button } from '../../../../components';
import Zomato from '../../../../services/Zomato';

interface CuisineSelectorProps {
  classes: Classes;
  cityId: number;
  onCuisinesSelected: (cuisines: Cuisine[]) => void
}

const CuisineSelector: FC<CuisineSelectorProps> = ({ classes = {}, cityId, onCuisinesSelected }) => {
  const [cuisineLibrary, setCuisineLibrary] = useState<Cuisine[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([])
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData () {
      const response = await Zomato.getCuisinesByCityId(cityId.toString());

      setCuisineLibrary(response)
      setSelectedCuisines(response.map(c => c.id))
    }

    fetchData()
  }, [cityId])

  const updateCuisineSelection = (id: number) => {
    const newSelection = selectedCuisines.slice()
    const index = newSelection.indexOf(id)

    if (index > -1) {
      newSelection.splice(index, 1)
    } else {
      newSelection.push(id)
    }

    return setSelectedCuisines(newSelection)
  }

  return (
    <>
      {
        selectorIsOpen ? (
          <div className={classes.root}>
            {
              cuisineLibrary.map((cuisine) => (
                <div
                  className={cx(classes.pill, {
                    [classes.pillActive as string]: selectedCuisines.indexOf(cuisine.id) > -1
                  })}
                  key={cuisine.id}
                  onClick={() => updateCuisineSelection(cuisine.id)}
                >
                  <Text style={{ color: 'inherit' }} caption>{cuisine.name}</Text>
                </div>
              ))
            }
          </div>
        ) : (
          <Button
            secondary
            onClick={() => setSelectorIsOpen(true)}
            icon={<List />}
          >
            Open Cuisine Editor
          </Button>
        )
      }
    </>
  )
}

export default CuisineSelector;
